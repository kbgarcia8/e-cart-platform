import styled from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';
import Section from 'components/molecules/Section';
import Button from 'components/atoms/Button/Button';
import ImageCarousel from 'components/molecules/ImageCarousel';
import ProductPreviewCard from 'components/molecules/ProductPreviewCard';

export const LandingPageWrapper = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

export const MainSection = styled(Section)`
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    width: 100%;
    min-width: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 2;

    ${media.mobile`
        min-height: 87.5vh;
        & h2 {
            flex: 2;
            display: flex;
            padding-top: ${v.spacing.large};
            align-items: center;
            color: ${({theme}) => theme.colors.textColor3};
            text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.notificationPalette.errorBackground};
            font-size: ${v.fontSize.giga};
            line-height: ${v.spacing.xlarge};
        }
    `}
`;

export const ExploreMenuButton = styled(Button)`
    align-self: center;
    flex: 0.5;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    ${media.mobile`
        width: 50%;
        & .button-icon-text-space span{
            font-size: ${v.fontSize.medium};
            font-weight: ${v.fontWeight.bolder};
            font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
        }
    `}
`;

export const MainSectionimageCarousel = styled(ImageCarousel)`
    flex: 4;
    width: 100%;
`;

export const FeatureSection = styled(Section)`
    background-color: ${({theme}) => theme.colors.backgroundColor4};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    ${media.mobile`
        min-height: 85vh;
        & h2 {
            flex: 1;
            display: flex;
            padding-top: ${v.spacing.large};
            align-items: center;
            color: ${({theme}) => theme.colors.textColor2};
            text-shadow: ${v.spacing.xxxsmall} ${v.spacing.xxxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.textColor3};
            font-size: calc(${v.fontSize.xxxlarge} + 0.2rem);
            line-height: ${v.spacing.xlarge};
        }
    `}
`;

export const FeaturesContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: ${v.spacing.large};
    gap: ${v.spacing.large};

    ${media.mobile`
        flex-direction: column;
    `}
`;

export const FeatureCard = styled.div<{ $imageUrl: string }>`
    position: relative;
    overflow: hidden;

    border-radius: ${v.borderRadius.medium};
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${v.spacing.medium};
    text-align: center;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("${({ $imageUrl }) => $imageUrl}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: brightness(0.7);
        opacity: 0.5; 
        z-index: 0;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;

export const FeatureHeader = styled.h3`
    font-size: ${v.fontSize.large};
    margin-bottom: ${v.spacing.small};
    color: ${({theme}) => theme.colors.textColor3};
    text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.textColor1};
    line-height: ${v.spacing.large};
`;

export const MenuPreviewSection = styled(Section)`
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    width: 100%;
    min-width: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 2;

    ${media.mobile`
        min-height: 87.5vh;
        & h2 {
            flex: 1;
            display: flex;
            padding-top: ${v.spacing.large};
            align-items: center;
            color: ${({theme}) => theme.colors.textColor3};
            text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.notificationPalette.errorBackground};
            font-size: ${v.fontSize.giga};
            line-height: ${v.spacing.xlarge};
        }
    `}
`;

export const ProductsPreviewContainer = styled.div`
    border: 2px solid red;
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: ${v.spacing.large};
    gap: ${v.spacing.large};

    ${media.mobile`
        flex-direction: column;
    `}
`;

export const SeeMoreProductsButton = styled(Button)`
    align-self: flex-end;
    flex: 0.25;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    ${media.mobile`
        width: 50%;
        & .button-icon-text-space span{
            font-size: ${v.fontSize.medium};
            font-weight: ${v.fontWeight.bolder};
            font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
        }
    `}
`;

export const PublicProductPreviewCard = styled(ProductPreviewCard)`

`;