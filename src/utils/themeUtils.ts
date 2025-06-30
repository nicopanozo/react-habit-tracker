import type { Theme } from '../types/Theme';

const THEME_STORAGE_KEY = 'theme';

export function saveThemeToStorage(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
}

export function loadThemeFromStorage(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;

    if (!storedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return storedTheme;
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error);
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
