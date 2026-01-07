import styled, { css } from 'styled-components';
import {v} from 'constants/variables';
import { media } from 'utils/utility';

export const COLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        background-color: ${({theme}) => theme.colors.shadow};
    `,
    dark: css`
        background-color: ${({theme}) => theme.colors.textColor1};
    `,
    light: css`
        background-color: ${({theme}) => theme.colors.screenColor};
    `
};

export const TEXTCOLORS = {
    primary: css`
        color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        color: ${({theme}) => theme.colors.shadow};
    `,
    dark: css`
        color: ${({theme}) => theme.colors.textColor1};
    `,
    light: css`
        color: ${({theme}) => theme.colors.screenColor};
    `
};

export const THICKNESS = {
    thin: css`height: 12.5%`,
    thick: css`height: 25%`,
    thicker: css`height: 50%`,
    thickest: css`height: 75%`,
    fill: css`height: 100%`
};

export const TEXTSIZE = {
    small: css`
        ${media.mobile`
            font-size: ${v.fontSize.small};
        `}
    `,
    medium: css`
        ${media.mobile`
            font-size: ${v.fontSize.medium};
        `}
    `,
    large: css`
        ${media.mobile`
            font-size: ${v.fontSize.xlarge};
        `}
    `,
    larger: css`
        ${media.mobile`
            font-size: ${v.fontSize.xxlarge};
        `}
    `,
    giga: css`
        ${media.mobile`
            font-size: ${v.fontSize.giga};
        `}
    `,
};

export const DividerContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
`;

export const DividerLine = styled.div<{
    $thickness?: keyof typeof THICKNESS;
    $lineColor?: keyof typeof COLORS;
}>`
    width: 100%;
    ${({$thickness})=> THICKNESS[$thickness || 'thick']}
    border: 1px solid ${({$lineColor})=> COLORS[$lineColor || 'dark']};
    background-color: ${({$lineColor})=> COLORS[$lineColor || 'dark']};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DividerText = styled.span<{
    $textSize?: keyof typeof TEXTSIZE;
    $textColor?: keyof typeof COLORS;
}>` 
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    padding-inline: ${v.spacing.xsmall};
    ${({$textColor})=> TEXTCOLORS[$textColor || 'dark']}
    background-color: transparent;
    position: relative;
    z-index: 1;
    ${({$textSize})=> TEXTSIZE[$textSize || 'small']}
`;