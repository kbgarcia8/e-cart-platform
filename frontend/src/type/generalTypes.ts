export type ColorString = string & { __brand: 'color' };

export interface Theme {
    name: string;
    colors: Record<string,ColorString>;
};

