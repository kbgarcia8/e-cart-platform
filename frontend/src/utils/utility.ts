import { v } from 'constants/variables'
import { css } from 'styled-components'
import type { ColorString } from 'type/generalTypes';

type MediaFn = (...args: Parameters<typeof css>) => ReturnType<typeof css>;

export const media = Object.keys(v.breakpoints).reduce((acc:Record<string, MediaFn>, label:string) => {
    acc[label] = (...args) => css`
    @media (min-width: ${v.breakpoints[label]}) {
        ${css(...args)}
        }
    `;
    return acc;
}, {});

export const isColor = (value: string): boolean => {
    const hex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    const rgb = /^rgb(a)?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
    return hex.test(value) || rgb.test(value) || CSS.supports('color', value);
};

export const asColor = (value: string): ColorString => {
    if (!isColor(value)) throw new Error(`Invalid color: ${value}`);
    return value as ColorString;
}; 