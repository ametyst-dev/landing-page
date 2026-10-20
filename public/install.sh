#!/bin/sh
# Ametyst CLI installer — https://ametyst.ai/install.sh
#
#   curl -fsSL https://ametyst.ai/install.sh | sh
#   AMETYST_CHANNEL=staging GH_PACKAGES_TOKEN=<token> sh -c "$(curl -fsSL https://ametyst.ai/install.sh)"
#
# Layout, under the cli state home (~/.ametyst prod, ~/.ametyst-staging staging):
#   <home>/versions/<v>/        npm install --prefix <home>/versions/<v> <pkg>@<v>
#   <home>/versions/current     symlink to the active version
#   <home>/bin/ametyst          sh shim: exec <node> <home>/versions/current/node_modules/<pkg>/dist/index.js
#   <home>/runtime/node/        a Node 22 LTS from nodejs.org (skipped with AMETYST_SYSTEM_NODE=1)
#
# Environment:
#   AMETYST_CHANNEL=staging     the staging package (@ametyst-dev/cli on GitHub Packages)
#   GH_PACKAGES_TOKEN=<token>   staging only; else the //npm.pkg.github.com/:_authToken line of ~/.npmrc
#   AMETYST_VERSION=<v>         install this exact version instead of the latest
#   AMETYST_SYSTEM_NODE=1       use the `node` on PATH instead of downloading one
#
# `ametyst update` moves to a newer release the same way. macOS and Linux, arm64 and x64.

set -eu

say() { printf '%s\n' "ametyst-install: $*"; }
die() { printf '%s\n' "ametyst-install: error: $*" >&2; exit 1; }

CHANNEL="${AMETYST_CHANNEL:-prod}"
case "$CHANNEL" in
  staging) HOME_DIR="$HOME/.ametyst-staging"; PKG="@ametyst-dev/cli" ;;
  prod|"") HOME_DIR="$HOME/.ametyst"; PKG="@ametyst/cli" ;;
  *) die "AMETYST_CHANNEL must be 'staging' or unset (got '$CHANNEL')" ;;
esac

case "$(uname -s)" in
  Darwin) OS=darwin ;;
  Linux) OS=linux ;;
  *) die "unsupported OS $(uname -s); on Windows run: npm i -g $PKG@latest" ;;
esac
case "$(uname -m)" in
  arm64|aarch64) ARCH=arm64 ;;
  x86_64|amd64) ARCH=x64 ;;
  *) die "unsupported architecture $(uname -m)" ;;
esac

mkdir -p "$HOME_DIR/versions" "$HOME_DIR/bin" "$HOME_DIR/runtime"
chmod 700 "$HOME_DIR"

# ── npm config: the staging package lives on GitHub Packages and needs a token ────────────────
NPMRC="$HOME_DIR/npmrc"
if [ "$CHANNEL" = "staging" ]; then
  TOKEN="${GH_PACKAGES_TOKEN:-}"
  if [ -z "$TOKEN" ] && [ -f "$HOME/.npmrc" ]; then
    TOKEN="$(sed -n 's#^//npm.pkg.github.com/:_authToken=##p' "$HOME/.npmrc" | head -n 1 | tr -d '\r')"
  fi
  [ -n "$TOKEN" ] || die "staging needs GH_PACKAGES_TOKEN (or a //npm.pkg.github.com/:_authToken line in ~/.npmrc)"
  OLD_UMASK="$(umask)"
  umask 077
  printf '%s\n%s\n' "@ametyst-dev:registry=https://npm.pkg.github.com" "//npm.pkg.github.com/:_authToken=$TOKEN" > "$NPMRC"
  umask "$OLD_UMASK"
  chmod 600 "$NPMRC"
  NPM_CONFIG_USERCONFIG="$NPMRC"
  export NPM_CONFIG_USERCONFIG
fi

# ── node: a downloaded Node 22 LTS, or the system node ────────────────────────────────────────
system_node() {
  N="$(command -v node 2>/dev/null || true)"
  [ -n "$N" ] || return 1
  MAJOR="$("$N" -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
  [ "$MAJOR" -ge 20 ] 2>/dev/null || return 1
  NODE="$N"
}

download_node() {
  command -v curl >/dev/null 2>&1 || return 1
  BASE="https://nodejs.org/dist/latest-v22.x"
  SUMS="$(curl -fsSL "$BASE/SHASUMS256.txt" 2>/dev/null)" || return 1
  LINE="$(printf '%s\n' "$SUMS" | grep " node-v22[.0-9]*-$OS-$ARCH.tar.gz\$" | head -n 1)"
  [ -n "$LINE" ] || return 1
  SUM="${LINE%% *}"
  FILE="${LINE##* }"
  TMP="$(mktemp -d)"
  curl -fsSL "$BASE/$FILE" -o "$TMP/$FILE" || { rm -rf "$TMP"; return 1; }
  if command -v sha256sum >/dev/null 2>&1; then GOT="$(sha256sum "$TMP/$FILE")"; else GOT="$(shasum -a 256 "$TMP/$FILE")"; fi
  [ "${GOT%% *}" = "$SUM" ] || { rm -rf "$TMP"; die "checksum mismatch on $FILE"; }
  tar -xzf "$TMP/$FILE" -C "$TMP" || { rm -rf "$TMP"; return 1; }
  "$TMP/${FILE%.tar.gz}/bin/node" --version >/dev/null 2>&1 </dev/null || { rm -rf "$TMP"; say "the downloaded Node does not run here"; return 1; }
  rm -rf "$HOME_DIR/runtime/node"
  mv "$TMP/${FILE%.tar.gz}" "$HOME_DIR/runtime/node" || { rm -rf "$TMP"; return 1; }
  rm -rf "$TMP"
  NODE="$HOME_DIR/runtime/node/bin/node"
}

NODE=""
if [ "${AMETYST_SYSTEM_NODE:-}" = "1" ]; then
  system_node || die "AMETYST_SYSTEM_NODE=1 but no node >= 20 on PATH"
  say "using the system node $NODE"
elif [ -x "$HOME_DIR/runtime/node/bin/node" ]; then
  NODE="$HOME_DIR/runtime/node/bin/node"
else
  say "downloading Node 22 LTS for $OS-$ARCH"
  if ! download_node; then
    system_node || die "nodejs.org unreachable and no node >= 20 on PATH"
    say "nodejs.org unreachable; using the system node $NODE"
  fi
fi
NODE_BIN="$(dirname "$NODE")"
NPM="$NODE_BIN/npm"
[ -x "$NPM" ] || NPM="$(command -v npm 2>/dev/null || true)"
[ -n "$NPM" ] || die "npm not found next to $NODE nor on PATH"
PATH="$NODE_BIN:$PATH"
export PATH

# ── version ───────────────────────────────────────────────────────────────────────────────────
VERSION="${AMETYST_VERSION:-}"
if [ -z "$VERSION" ]; then
  VERSION="$("$NPM" view "$PKG" version 2>/dev/null | tail -n 1)" || true
  [ -n "$VERSION" ] || die "cannot read the latest version of $PKG from the registry"
fi

# ── install into versions/<v>, check it runs, then promote `current` ──────────────────────────
DEST="$HOME_DIR/versions/$VERSION"
ENTRY="$DEST/node_modules/$PKG/dist/index.js"
install_version() {
  say "installing $PKG@$VERSION"
  rm -rf "$DEST"
  "$NPM" install --prefix "$DEST" --no-audit --no-fund "$PKG@$VERSION" >/dev/null </dev/null || { rm -rf "$DEST"; die "npm install $PKG@$VERSION failed"; }
}
entry_version() { "$NODE" "$ENTRY" --version 2>/dev/null </dev/null || true; }
FRESH=0
if [ ! -f "$ENTRY" ]; then install_version; FRESH=1; fi
GOT="$(entry_version)"
if [ "$GOT" != "$VERSION" ] && [ "$FRESH" = 0 ] && [ "$(readlink "$HOME_DIR/versions/current" 2>/dev/null || true)" != "$VERSION" ]; then
  install_version
  GOT="$(entry_version)"
fi
[ "$GOT" = "$VERSION" ] || die "$PKG@$VERSION installed but '--version' printed '$GOT'; current left unchanged"

LINK="$HOME_DIR/versions/current"
ln -sfn "$VERSION" "$LINK.new"
mv -fT "$LINK.new" "$LINK" 2>/dev/null || mv -fh "$LINK.new" "$LINK" 2>/dev/null || { rm -f "$LINK.new"; ln -sfn "$VERSION" "$LINK"; }

SHIM="$HOME_DIR/bin/ametyst"
printf '#!/bin/sh\nexec "%s" "%s" "$@"\n' "$NODE" "$HOME_DIR/versions/current/node_modules/$PKG/dist/index.js" > "$SHIM.new"
chmod 755 "$SHIM.new"
mv -f "$SHIM.new" "$SHIM"

say "installed $PKG $VERSION → $SHIM"
case ":$PATH:" in
  *":$HOME_DIR/bin:"*) ;;
  *) say "add it to your PATH (e.g. in ~/.zshrc or ~/.bashrc):"
     printf '  export PATH="%s:$PATH"\n' "$HOME_DIR/bin" ;;
esac
