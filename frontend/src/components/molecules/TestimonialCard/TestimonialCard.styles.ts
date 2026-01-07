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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    padding: ${v.spacing.medium};
    ${({$cardColor})=> CARDCOLORS[$cardColor || 'primary']}
    ${({$cardRadius})=> RADIUS[$cardRadius || 'square']}
`;

export const TestimonialCardInfoContainer = styled.div`
    flex: 0 0 auto;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block: ${v.spacing.medium};
`;

export const TestimoneePictureContainer = styled.div`
    aspect-ratio: 1/1;
    flex: 0 0 7.5rem;
    overflow: hidden;
    border-radius: ${v.borderRadius.circle};
    border: ${v.borderThickness.medium} solid ${({theme}) => theme.colors.borderColor1};
    margin-inline: ${v.spacing.small};
`;

export const TestimoneePicture = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const TestimonialCardNameAndRatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

export const TestimonialCardUserName = styled.span<{$nameColor?: keyof typeof NAMECOLORS}>`
    flex: 1;
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    display: block;
    overflow: hidden;
    overflow-y: hidden;
    font-weight: ${v.fontWeight.bold};
    padding: ${v.spacing.xsmall};
    ${({$messageColor})=> MESSAGECOLORS[$messageColor || 'primary']}

    ${media.mobile`
        font-size: calc(${v.fontSize.medium} + 0.1rem);
    `}
`;