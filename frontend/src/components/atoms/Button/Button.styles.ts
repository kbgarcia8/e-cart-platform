import styled, {css} from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';


const COLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
        color: ${({theme})=> theme.colors.textColor3};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor2};

        &:hover {
            background-color: ${({theme})=> theme.colors.backgroundColor2};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.textColor3};
        }
        
        &:disabled{
            background-color: ${({theme})=> theme.notificationPalette.infoText};
            color: ${({theme})=> theme.colors.shadow};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.shadow};
            cursor: not-allowed;
        }
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor4};
        color: ${({theme})=> theme.colors.textColor1};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor1};

        &:hover {
            background-color: ${({theme})=> theme.colors.backgroundColor4};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor2};
        }

        &:disabled{
            background-color: ${({theme})=> theme.notificationPalette.warningText};
            color: ${({theme})=> theme.colors.shadow};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.shadow};
        }
    `,
    ghost: css`
        background-color: transparent;
        color: ${({theme})=> theme.colors.textColor3};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.textColor3};

        &:hover {
            background-color: ${({theme})=> theme.colors.textColor2};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.backgroundColor3};
        }

        &:disabled{
            background-color: ${({theme})=> theme.notificationPalette.shadow};
            color: ${({theme})=> theme.colors.shadow};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.shadow};
        }
    `,
    bnw: css`
        background-color: ${({theme}) => theme.colors.borderColor1};
        color: ${({theme})=> theme.colors.borderColor2};
        border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.borderColor2};

        &:hover {
            background-color: ${({theme})=> theme.colors.textColor2};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.textColor1};
        }

        &:disabled{
            background-color: ${({theme})=> theme.notificationPalette.shadow};
            color: ${({theme})=> theme.colors.shadow};
            border: ${v.borderThickness.light} solid ${({theme})=> theme.colors.shadow};
        }
    `
};

const SIZES = {
    small: css`
        ${media.mobile`
            font-size: ${v.fontSize.xsmall};
            font-weight: ${v.fontWeight.bolder};
        `}
    `,
    medium: css`
        ${media.mobile`
            font-size: ${v.fontSize.xsmall};
            font-weight: ${v.fontWeight.bold};
        `}
    `,
    large: css`
        ${media.mobile`
            font-size: ${v.fontSize.medium};
            font-weight: ${v.fontWeight.medium};
        `}
    `,
};

const RADIUS = {
    square: css`border-radius: ${v.borderRadius.xsmall};`,
    roundedsquare: css`border-radius: ${v.borderRadius.medium};`,
    squircle: css`border-radius: ${v.borderRadius.large};`,
    pill: css`border-radius: ${v.borderRadius.xlarge};`,
    circle: css`border-radius: ${v.borderRadius.circle};`
};


export const DefaultButton = styled.button<{
        $color?: keyof typeof COLORS,
        $radius?: keyof typeof RADIUS,
    }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${v.spacing.xxxsmall} ${v.spacing.small};
    flex: 1;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    ${({ $color }) => COLORS[$color || 'primary']}
    ${({ $radius }) => RADIUS[$radius || 'square']}
    
    & .button-icon-text-space svg {
        display: block;
        flex: 1;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export const ButtonTextAndIconSpace = styled.div<{ $hasIcon: boolean; $hasText: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${({ $hasIcon, $hasText }) =>
        $hasIcon && $hasText
            ? css``
            : css`
                & > * {
                    flex: 1;
                }
            `}
`;

export const ButtonIcon = styled.img`
    flex: 1;
    max-width: 100%;
`;

export const ButtonText = styled.span<{ $size?: keyof typeof SIZES }>`
    flex: 2;
    ${({ $size }) => SIZES[$size || 'small']}
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
`;