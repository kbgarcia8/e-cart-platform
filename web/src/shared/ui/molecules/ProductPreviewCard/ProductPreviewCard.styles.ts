import styled, { css } from 'styled-components';
import { v } from 'shared/constants/variables';
import { media } from 'shared/utils/utility';

export const RADIUS = {
    square: css`border-radius: ${v.borderRadius.xsmall};`,
    roundedsquare: css`border-radius: ${v.borderRadius.medium};`,
    squircle: css`border-radius: ${v.borderRadius.large};`,
    pill: css`border-radius: ${v.borderRadius.xlarge};`,
    circle: css`border-radius: ${v.borderRadius.circle};`
};

export const CARDCOLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        background-color: ${({theme}) => theme.colors.textColor3};
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
        color: ${({theme}) => theme.colors.textColor3};
    `,
    dark: css`
        color: ${({theme}) => theme.colors.textColor1};
    `,
    light: css`
        color: ${({theme}) => theme.colors.screenColor};
    `
};

export const ProductPreviewCardContainer = styled.div<{
    $cardRadius?: keyof typeof RADIUS;
    $cardColor?: keyof typeof CARDCOLORS;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    width: 75%;
    min-width: 75%;
    max-width: 75%;
    ${({$cardRadius})=> RADIUS[$cardRadius || 'square']}
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    ${({$cardColor})=> CARDCOLORS[$cardColor || 'dark']}
    padding: ${v.spacing.medium};
`;

export const ProductImageContainer = styled.div<{ $imageRadius?: keyof typeof RADIUS }>`
    width: 100%;
    overflow: hidden;
    ${({$imageRadius})=> RADIUS[$imageRadius || 'square']}
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

    ${media.mobile`
        flex: 0 0 15rem;
    `}
`;

export const ProductImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const ProductTitle = styled.h2<{$titleColor?: keyof typeof TEXTCOLORS;}>`
    flex: 0.5;
    display: flex;
    align-items: center;
    align-items: left;
    min-width: 100%;
    max-width: 100%;
    max-height: 35%;
    padding: 0.25rem;
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    ${({$titleColor})=> TEXTCOLORS[$titleColor || 'dark']}
    margin-top: ${v.spacing.xxxsmall};
    
    ${media.mobile`
        font-size: ${v.fontSize.xlarge};
    `}
`;

export const PriceContainer = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: ${v.spacing.medium};
`;

export const AddToCartButtonWrapper = styled.div`
    flex: 0.75;
    display: flex;
    height: 100%;
`;

export const ProductBasePrice = styled.span<{$priceColor?: keyof typeof TEXTCOLORS}>`
    flex: 2;
    font-size: ${v.fontSize.medium};
    font-weight: ${v.fontWeight.bold};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    ${({$priceColor})=> TEXTCOLORS[$priceColor || 'dark']}
`;