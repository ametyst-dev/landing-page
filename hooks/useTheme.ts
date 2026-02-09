'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'ametyst-theme';
const DEFAULT_THEME: Theme = 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme && isValidTheme(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(DEFAULT_THEME);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return { theme, setTheme, mounted };
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function isValidTheme(theme: string): theme is Theme {
  return ['light', 'dark'].includes(theme);
}
