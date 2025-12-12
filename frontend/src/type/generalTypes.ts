export type ColorString = string & { __brand: 'color' };

export interface Theme {
    name: string;
    colors: Record<string,ColorString>;
    anchorTheme: Record<string,ColorString>;
    notificationPalette: Record<string,ColorString>;
};

export interface themeContextValue {
    currentTheme: Theme;
    toggleTheme: () => void;
};