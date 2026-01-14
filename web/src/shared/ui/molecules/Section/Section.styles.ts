import styled, { css } from "styled-components";
import { v } from "constants/variables";
import { media } from "utils/utility";

export const TITLESIZE = {
    bigger: css`
        ${media.mobile`
            font-size: ${v.fontSize.xxlarge};
        `}
    `,
    upsize: css`
        ${media.mobile`
            font-size: ${v.fontSize.xxxlarge};
        `}
    `,
    giga: css`
        ${media.mobile`
            font-size: ${v.fontSize.giga};
        `}
    `,
    none: css``
};

export const DESCRIPTIONSIZE = {
    upsize: css`
        ${media.mobile`
            font-size: ${v.fontSize.medium};
        `}
    `,
    larger: css`
        ${media.mobile`
            font-size: ${v.fontSize.large};
        `}
    `,
    largest: css`
        ${media.mobile`
            font-size: ${v.fontSize.xlarge};
        `}
    `,
    none: css``
};

export const TITLECOLORS = {
    primary: css`
        color: ${({theme}) => theme.colors.backgroundColor1};
        text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.textColor3};
    `,
    secondary: css`
        color: ${({theme}) => theme.colors.textColor3};
        text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.notificationPalette.errorBackground};
    `,
    teritiary: css`
        color: ${({theme}) => theme.colors.textColor2};
        text-shadow: ${v.spacing.xxxsmall} ${v.spacing.xxxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.textColor3};
    `,
    bnw: css`
        color: ${({theme}) => theme.colors.textColor1};
        text-shadow: ${v.spacing.xxxsmall} ${v.spacing.xxxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.shadow};
    `,
};


export const DESCRIPTIONCOLORS = {
    primary: css`
        color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        color: ${({theme})=> theme.colors.textColor3};
    `,
    bnw: css`
        color: ${({theme})=> theme.colors.textColor1};
    `,
};


export const SectionWrapper = styled.section`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    padding: ${v.spacing.medium};
    overflow: hidden;
`;

export const SectionTitle = styled.h2<{$titleBottomMargin?: string, $titleSize?: keyof typeof TITLESIZE, $titleColor?: keyof typeof TITLECOLORS}>`
    margin-bottom: ${({$titleBottomMargin}) => $titleBottomMargin};
    text-align: left;
    font-weight: ${v.fontWeight.bolder};
    ${({ $titleSize })=> TITLESIZE[$titleSize || 'none']}
    ${({ $titleColor })=> TITLECOLORS[$titleColor || 'bnw']}

`;

export const SectionDescription = styled.h4<{$descriptionBottomMargin?: string, $descriptionSize?: keyof typeof DESCRIPTIONSIZE, $descriptionColor?: keyof typeof DESCRIPTIONCOLORS}>`
    margin-bottom: ${({$descriptionBottomMargin})=> $descriptionBottomMargin};
    text-align: left;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    ${({ $descriptionSize })=> DESCRIPTIONSIZE[$descriptionSize || 'none']}
    ${({ $descriptionColor })=> DESCRIPTIONCOLORS[$descriptionColor || 'bnw']}
`;