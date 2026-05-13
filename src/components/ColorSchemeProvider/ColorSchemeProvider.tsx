'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
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

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('color-scheme') as ColorScheme | null;
    if (stored === 'dark' || stored === 'light') {
      setColorScheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    localStorage.setItem('color-scheme', colorScheme);
  }, [colorScheme]);

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
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
