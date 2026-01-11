import styled, { css, keyframes } from "styled-components";
import { v } from "constants/variables";
import { media } from "utils/utility";

const expandPanel = keyframes`
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 20rem;
        opacity: 1;
    }
`;

export const INDICATORCOLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
        color: ${({theme})=> theme.colors.textColor3};
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor3};
        color: ${({theme})=> theme.colors.textColor1};
    `,
    ghost: css`
        background-color: ${({theme})=> theme.colors.shadow};
        color: ${({theme})=> theme.colors.textColor1};
    `,
    bnw: css`
        background-color: ${({theme}) => theme.colors.borderColor1};
        color: ${({theme}) => theme.colors.screenColor};
    `
};

export const PANELCOLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor2};
        & > p {
            color: ${({theme})=> theme.colors.textColor3};
        }
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor4};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor1};
        & > p {
            color: ${({theme})=> theme.colors.textColor1};
        }
    `,
    ghost: css`
        background-color: ${({theme})=> theme.colors.shadow};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.textColor3};
        & > p {
            color: ${({theme})=> theme.colors.textColor1};
        }
    `,
    bnw: css`
        background-color: ${({theme}) => theme.colors.borderColor1};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor2};
        & > p {
            color: ${({theme}) => theme.colors.screenColor};
        }
    `
};

export const AccordionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: ${v.spacing.large};
`;

export const HeaderButtonWrapper = styled.div<{
    $indicatorString?: string;
    $indicatorSVGURL?: string;
    $indicatorColor?: keyof typeof INDICATORCOLORS;
}>`
    display: flex;
    width: 100%;
    min-height: 4rem;

    &::after {
        ${({ $indicatorString, $indicatorSVGURL }) => {
            if (!$indicatorString && !$indicatorSVGURL) return css`content: "+";`;

            if ($indicatorString) return css`content: "${$indicatorString}";`;

            return css`content: url(${$indicatorSVGURL});`;
        }}
        ${({$indicatorColor}) => INDICATORCOLORS[$indicatorColor || 'primary']}
        display: flex;
        align-items: center;

        font-size: ${v.fontSize.xlarge};
        font-weight: ${v.fontWeight.bolder};
        pointer-events: none;
    }
    &.active::after {
        padding: ${v.spacing.xxxsmall};
        ${({ $indicatorString, $indicatorSVGURL }) => {
            if (!$indicatorString && !$indicatorSVGURL) {
            return css`content: " - ";`;
            }

            if ($indicatorString) {
            return css`content: "${$indicatorString}";`;
            }
            return css`content: url(${$indicatorSVGURL});`;
        }}
    }
`;

export const AccordionPanel = styled.div<{ $panelColor?: keyof typeof PANELCOLORS}>`
    display: none;
    padding: ${v.spacing.small};
    ${({ $panelColor }) => PANELCOLORS[$panelColor || 'bnw']}

    &.active {
        display: block;
    }

    &.active p {
        animation: ${expandPanel} 0.3s ease-out forwards;
    }
`;

export const AccordionPanelContent = styled.p`
    overflow-wrap: break-word;
    white-space: pre-line;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;

    ${media.mobile`
        font-weight: ${v.fontWeight.bolder};
        font-size: ${v.fontSize.medium};
    `}
`;