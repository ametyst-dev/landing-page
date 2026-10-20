// @vitest-environment node
//
// public/install.sh — the Ametyst CLI installer served at https://ametyst.ai/install.sh.
// The script runs against a fake `npm` placed next to a `node` symlink, so no network and no
// real package is touched: the fake installs a stub cli whose `--version` prints the version it
// was installed as (or what FAKE_PRINTS says, to simulate a broken release).
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execFileSync, spawnSync } from "child_process";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

const SCRIPT = resolve(__dirname, "../public/install.sh");

const FAKE_NPM = `#!/bin/sh
# fake npm: \`view <pkg> version\` and \`install --prefix <dir> --no-audit --no-fund <pkg>@<v>\`
echo "$*" >> "$FAKE_LOG"
case "$1" in
  view) echo "$FAKE_LATEST" ;;
  install)
    DEST="$3"; SPEC=""; for a in "$@"; do SPEC="$a"; done
    PKG="\${SPEC%@*}"; V="\${SPEC##*@}"
    mkdir -p "$DEST/node_modules/$PKG/dist"
    P="\${FAKE_PRINTS:-$V}"
    printf '%s\\n' "console.log(process.argv[2] === '--version' ? '$P' : 'ran')" > "$DEST/node_modules/$PKG/dist/index.js"
    ;;
esac
`;

let root: string;
let home: string;
let bin: string;

function run(env: Record<string, string>) {
  return spawnSync("sh", [SCRIPT], {
    env: {
      PATH: `${bin}:/usr/bin:/bin`,
      HOME: home,
      AMETYST_SYSTEM_NODE: "1",
      FAKE_LOG: join(root, "npm.log"),
      FAKE_LATEST: "0.3.140",
      ...env,
    },
    encoding: "utf8",
  });
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "install-sh-"));
  home = join(root, "home");
  bin = join(root, "bin");
  execFileSync("mkdir", ["-p", home, bin]);
  symlinkSync(process.execPath, join(bin, "node"));
  writeFileSync(join(bin, "npm"), FAKE_NPM);
  chmodSync(join(bin, "npm"), 0o755);
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe("public/install.sh", () => {
  it("parses as POSIX sh", () => {
    expect(() => execFileSync("sh", ["-n", SCRIPT])).not.toThrow();
  });

  it("prod: installs the latest @ametyst/cli under ~/.ametyst with a current link and a shim", () => {
    const r = run({});
    expect(r.status, r.stderr).toBe(0);
    const h = join(home, ".ametyst");
    expect(existsSync(join(h, "versions/0.3.140/node_modules/@ametyst/cli/dist/index.js"))).toBe(true);
    expect(readlinkSync(join(h, "versions/current"))).toBe("0.3.140");
    const shim = join(h, "bin/ametyst");
    expect(statSync(shim).mode & 0o111).not.toBe(0);
    expect(readFileSync(shim, "utf8")).toContain(join(h, "versions/current/node_modules/@ametyst/cli/dist/index.js"));
    expect(execFileSync(shim, ["--version"], { encoding: "utf8" }).trim()).toBe("0.3.140");
    expect(readFileSync(join(root, "npm.log"), "utf8")).toContain(
      `install --prefix ${join(h, "versions/0.3.140")} --no-audit --no-fund @ametyst/cli@0.3.140`,
    );
    expect(r.stdout).toContain(`export PATH="${join(h, "bin")}:$PATH"`);
    expect(existsSync(join(h, "npmrc"))).toBe(false);
  });

  it("staging: @ametyst-dev/cli under ~/.ametyst-staging, token written to <home>/npmrc (0600)", () => {
    const r = run({ AMETYST_CHANNEL: "staging", GH_PACKAGES_TOKEN: "tok123" });
    expect(r.status, r.stderr).toBe(0);
    const h = join(home, ".ametyst-staging");
    expect(readlinkSync(join(h, "versions/current"))).toBe("0.3.140");
    expect(existsSync(join(h, "versions/0.3.140/node_modules/@ametyst-dev/cli/dist/index.js"))).toBe(true);
    const npmrc = readFileSync(join(h, "npmrc"), "utf8");
    expect(npmrc).toContain("@ametyst-dev:registry=https://npm.pkg.github.com");
    expect(npmrc).toContain("//npm.pkg.github.com/:_authToken=tok123");
    expect(statSync(join(h, "npmrc")).mode & 0o077).toBe(0);
    expect(r.stdout + r.stderr).not.toContain("tok123");
  });

  it("staging: falls back to the token line of ~/.npmrc", () => {
    writeFileSync(join(home, ".npmrc"), "//npm.pkg.github.com/:_authToken=fromrc\n");
    const r = run({ AMETYST_CHANNEL: "staging" });
    expect(r.status, r.stderr).toBe(0);
    expect(readFileSync(join(home, ".ametyst-staging/npmrc"), "utf8")).toContain("_authToken=fromrc");
  });

  it("staging without any token refuses and installs nothing", () => {
    const r = run({ AMETYST_CHANNEL: "staging" });
    expect(r.status).not.toBe(0);
    expect(r.stderr).toContain("GH_PACKAGES_TOKEN");
    expect(existsSync(join(home, ".ametyst-staging/versions/current"))).toBe(false);
  });

  it("AMETYST_VERSION pins the version and skips the registry lookup", () => {
    const r = run({ AMETYST_VERSION: "0.3.100" });
    expect(r.status, r.stderr).toBe(0);
    expect(readlinkSync(join(home, ".ametyst/versions/current"))).toBe("0.3.100");
    expect(readFileSync(join(root, "npm.log"), "utf8")).not.toContain("view");
  });

  it("a release whose --version does not match is not promoted: current stays on the old version", () => {
    expect(run({ AMETYST_VERSION: "0.3.100" }).status).toBe(0);
    const r = run({ AMETYST_VERSION: "0.3.101", FAKE_PRINTS: "garbage" });
    expect(r.status).not.toBe(0);
    expect(readlinkSync(join(home, ".ametyst/versions/current"))).toBe("0.3.100");
  });

  it("re-running moves current to the newer version", () => {
    expect(run({ AMETYST_VERSION: "0.3.100" }).status).toBe(0);
    expect(run({}).status).toBe(0);
    expect(readlinkSync(join(home, ".ametyst/versions/current"))).toBe("0.3.140");
  });

  it("refuses an unknown channel", () => {
    const r = run({ AMETYST_CHANNEL: "beta" });
    expect(r.status).not.toBe(0);
    expect(existsSync(join(home, ".ametyst"))).toBe(false);
  });
});
