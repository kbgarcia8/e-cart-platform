export type ColorString = string & { __brand: 'color' };

export interface GeneralTheme {
    name: string;
    colors: Record<string,ColorString>;
};

export type Theme =  {
    anchorTheme: Record<string,ColorString>;
    notificationPalette: Record<string,ColorString>;
    footerTheme: Record<string,ColorString>;
} & GeneralTheme;

export interface themeContextValue {
    currentTheme: Theme;
    toggleTheme: () => void;
};