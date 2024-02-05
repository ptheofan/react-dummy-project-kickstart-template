import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
                                children,
                                defaultTheme = 'system',
                                storageKey = 'vite-ui-theme',
                                ...props
                              }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const setRootThemeClass = (newThemeClass: string) => {
      root.classList.remove('dark', 'light');
      root.classList.add(newThemeClass);
    }

    const activateTheme = (e: MediaQueryListEvent) => {
      let newTheme: Theme = e.matches ? 'dark' : 'light';
      if (theme === 'system') {
        newTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
      }

      setRootThemeClass(newTheme);
    };

    colorSchemeQuery.addEventListener('change', activateTheme);

    // Default Value
    const storedThemeValue = localStorage.getItem(storageKey);
    if (storedThemeValue === 'dark') {
      setRootThemeClass('dark');
    } else if (storedThemeValue === 'light') {
      setRootThemeClass('light');
    } else {
      setRootThemeClass(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    }

    return () => {
      colorSchemeQuery.removeEventListener('change', activateTheme);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider { ...props } value={ value }>
      { children }
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
