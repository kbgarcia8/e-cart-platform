import styled from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';
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

export const MainSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    max-width: 100%;
`;

export const ExploreMenuButtonWrapper = styled.div`
    display: flex;
    align-self: center;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    margin-block: ${v.spacing.xlarge};

    ${media.mobile`
        height: 7.5svh;
    `}
`;

export const MainSectionImageCarouselWrapper = styled.div`
    width: 100%;
    margin-top: ${v.spacing.medium};
    margin-bottom: ${v.spacing.large};
`;

export const FeatureSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor4};
    max-width: 100%;
    width: 100%;
`;

export const FeaturesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 2px solid red;
    padding: ${v.spacing.large};
    gap: ${v.spacing.xlarge};

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
    color: ${({theme}) => theme.colors.textColor3};
    text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.colors.textColor1};
`;

export const MenuPreviewSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    max-width: 100%;
    width: 100%;
`;

export const ProductsPreviewContainer = styled.div`
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    flex: 2.5;
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: ${v.spacing.large};
    margin-bottom: ${v.spacing.small};
    gap: ${v.spacing.large};

    & > * {
        flex: 0 0 auto;
    }

    ${media.mobile`
        --webkit-overflow-scrolling: touch;
        margin-block: ${v.spacing.xlarge};
    `}
`;

export const SeeMoreProductsButtonWrapper = styled.div`
    align-self: flex-end;
    flex: 0.25;
    display: flex;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    width: 50%;
    margin-top: ${v.spacing.medium};
`;

export const TestimonialSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor4};
    max-width: 100%;
    width: 100%;
`;

export const TestimonialsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border: 2px solid blue;
    
    ${media.mobile`
        gap: ${v.spacing.medium};
    `}
`;