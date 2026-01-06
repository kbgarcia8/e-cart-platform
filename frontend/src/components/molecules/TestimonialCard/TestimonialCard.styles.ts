import styled, { css } from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';

export const CARDCOLORS = {
    primary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        background-color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        background-color: ${({theme})=> theme.colors.borderColor2};
    `,
    dark: css`
        background-color: ${({theme}) => theme.colors.borderColor1};
    `,
    light: css`
        background-color: ${({theme}) => theme.colors.screenColor};
    `,
};

export const NAMECOLORS = {
    primary: css`
        color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        color: ${({theme})=> theme.colors.borderColor2};
    `,
    dark: css`
        color: ${({theme}) => theme.colors.borderColor1};
    `,
    light: css`
        color: ${({theme}) => theme.colors.screenColor};
    `,
};

export const MESSAGECOLORS = {
    primary: css`
        color: ${({theme})=> theme.colors.backgroundColor1};
    `,
    secondary: css`
        color: ${({theme})=> theme.colors.backgroundColor3};
    `,
    teritiary: css`
        color: ${({theme})=> theme.colors.textColor3};
    `,
    dark: css`
        color: ${({theme}) => theme.colors.borderColor1};
    `,
    light: css`
        color: ${({theme}) => theme.colors.shadow};
    `,
};

export const RADIUS = {
    square: css`border-radius: ${v.borderRadius.xsmall};`,
    roundedsquare: css`border-radius: ${v.borderRadius.medium};`,
    squircle: css`border-radius: ${v.borderRadius.large};`,
    pill: css`border-radius: ${v.borderRadius.xlarge};`,
    circle: css`border-radius: ${v.borderRadius.circle};`
};

export const TestimonialCardWrapper = styled.div<{
    $cardColor?: keyof typeof CARDCOLORS,
    $cardRadius?: keyof typeof RADIUS
}>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    padding: ${v.spacing.medium};
    border: 2px solid red;
    margin-block: ${v.spacing.xxlarge};
    ${({$cardColor})=> CARDCOLORS[$cardColor || 'primary']}
    ${({$cardRadius})=> RADIUS[$cardRadius || 'square']}
`;
export const TestimoneePictureContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const TestimoneePicture = styled.img`
    flex: 1;
    width: 100%;
    height: 100%;
    aspect-ratio: 4/3;
    border-radius: ${v.borderRadius.circle};
    border: ${v.borderThickness.medium} solid ${({theme}) => theme.colors.borderColor1};
`;

export const TestimonialCardUserName = styled.span<{$nameColor?: keyof typeof NAMECOLORS}>`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    font-weight: ${v.fontWeight.bold};
    ${({$nameColor})=> NAMECOLORS[$nameColor || 'primary']}

    ${media.mobile`
        font-size: ${v.fontSize.medium};
    `}

`;

export const StarRatingContainer = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const TestimonialCardMessage = styled.p<{$messageColor?: keyof typeof MESSAGECOLORS}>`
    flex: 2.5;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    font-weight: ${v.fontWeight.bold};
    padding: ${v.spacing.xsmall};
    ${({$messageColor})=> MESSAGECOLORS[$messageColor || 'primary']}

    ${media.mobile`
        font-size: calc(${v.fontSize.small} + 0.1rem);
    `}
`;