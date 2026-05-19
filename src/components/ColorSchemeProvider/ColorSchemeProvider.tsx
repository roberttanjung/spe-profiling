'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: 'light',
  toggleColorScheme: () => {},
});

const STORAGE_KEY = 'color-scheme';
const listeners = new Set<() => void>();

function readStoredColorScheme(): ColorScheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

function subscribeColorScheme(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

function notifyColorSchemeChange() {
  listeners.forEach((listener) => listener());
}

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useSyncExternalStore<ColorScheme>(
    subscribeColorScheme,
    readStoredColorScheme,
    () => 'light',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    localStorage.setItem(STORAGE_KEY, colorScheme);
  }, [colorScheme]);

  const toggleColorScheme = () => {
    const nextColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, nextColorScheme);
    document.documentElement.setAttribute('data-color-scheme', nextColorScheme);
    notifyColorSchemeChange();
  };

  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        palette: {
          mode: colorScheme,
        },
        typography: {
          fontFamily: 'var(--font-roboto)',
        },
      }),
    [colorScheme],
  );

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorSchemeContext.Provider>
  );
}
