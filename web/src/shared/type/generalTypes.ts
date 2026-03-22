import type { AuthUserDTO } from "./shared.types";

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

export interface mediaQueryContextValue {
    currentBreakpoints: {
        isMobile: boolean;
        isTablet: boolean;
        isLaptop: boolean;
        isDesktop: boolean;
        isLargeDesktop: boolean;
    }
}

export interface authContextValue {
    user: AuthUserDTO | null;
    checkLoggedUser: () => Promise<AuthUserDTO|null>;
    refreshUser: () => Promise<AuthUserDTO|null>;
    authLoading: boolean;
    authError: string|null;
}

export type dataAttributesType = Record<string, string | number | boolean | undefined> | undefined;

export type AllNodeProps<T extends React.ReactNode> = {
    [key: string]: T;
};

export type SVGProps = Record<string, string|number|undefined>;