import styled from 'styled-components';
import { v } from 'shared/constants/variables';
import { media } from 'shared/utils/utility';
import { Link } from 'react-router-dom';

export const LandingMainWrapper = styled.div`
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
    width: 100%;
    padding-block: calc(${v.spacing.large} + 0.1rem);
`;

export const ExploreMenuButtonWrapper = styled.div`
    display: flex;
    align-self: center;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    margin-block: ${v.spacing.xxlarge};

    ${media.mobile`
        height: 7.5svh;
    `}
`;

export const MainSectionImageCarouselWrapper = styled.div`
    width: 100%;
    margin-top: ${v.spacing.medium};
    margin-bottom: ${v.spacing.xlarge};
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
    padding: ${v.spacing.large};
    gap: ${v.spacing.xxlarge};
    margin-block: ${v.spacing.xlarge};

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
    width: 100%;
    padding-block: ${v.spacing.xxxlarge};
`;

export const ProductsPreviewContainer = styled.div`
    box-shadow: 0 4px 8px 0 ${({theme})=> theme.colors.shadow};
    flex: 5;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: ${v.spacing.large};
    margin-block: ${v.spacing.xxlarge};
    gap: ${v.spacing.large};

    & > * {
        flex: 0 0 auto;
    }

    ${media.mobile`
        --webkit-overflow-scrolling: touch;
        margin-block: ${v.spacing.xxlarge};
    `}
`;

export const SeeMoreProductsButtonWrapper = styled.div`
    align-self: flex-end;
    flex: 1;
    display: flex;
    border-radius: ${v.borderRadius.medium};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    width: 50%;
    margin-top: ${v.spacing.medium};
    margin-bottom: ${v.spacing.small};
`;

export const TestimonialSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor4};
    width: 100%;
    padding: ${v.spacing.small};
`;

export const TestimonialsContainer = styled.div`
    flex: 1;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    
    ${media.mobile`
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: 30rem;
        gap: ${v.spacing.large};
        margin-top: ${v.spacing.medium};
    `}
    ${media.tablet`
        display: flex;
        flex-wrap: wrap;    
    `}
`;

export const FAQSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    width: 100%;
    padding-block: ${v.spacing.large};
`;

export const FAQsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${v.spacing.medium};
    margin-block: ${v.spacing.xlarge};

    ${media.mobile`
        flex-direction: column;
    `}
`;

export const ContactSectionWrapper = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.colors.backgroundColor4};
    width: 100%;
    padding: ${v.spacing.small};
    padding-block: ${v.spacing.large};
`;

export const ContactSpace = styled.div`
    width: 100%;
    display: grid;
    margin-bottom: ${v.spacing.large};
    margin-top: ${v.spacing.xlarge};
    

    ${media.mobile`
        gap: ${v.spacing.large};
        grid-auto-flow: row;
        grid-auto-rows: 5rem;
    `}
    ${media.tablet`
        gap: ${v.spacing.medium};
        grid-auto-flow: row;
        grid-auto-rows: 10rem;
    `}
`;

export const ContactContainer = styled(Link)`
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${v.spacing.small};
    color: ${({theme}) => theme.colors.textColor3};
    text-decoration: none;
`;

export const IconContainer = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    align-content: center;
    
    & svg {
        width: 100%;
        height: 100%;
    }
`;

export const InformationContainer = styled.div`
    width: 75%;
    margin-left: ${v.spacing.small};
    padding: ${v.spacing.xxsmall};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const InformationTitle = styled.span`
    display: flex;
    align-items: center;
    height: 50%;
    width: 100%;
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.tertiary};
    margin: 0;

    ${media.mobile`
        font-size: ${v.fontSize.medium};
    `}
`;

export const Information = styled(InformationTitle)`
    padding-top: ${v.spacing.xxsmall};
    font-family: ${v.fonts.primary};
    font-weight: ${v.fontWeight.regular};
    font-size: calc(${v.fontSize.small} + 0.1rem);
`;

export const LocationInformationSpace = styled.div`
    padding: ${v.spacing.medium};
    margin-bottom: ${v.spacing.large};
    margin-top: ${v.spacing.xxlarge};

    & svg {
        color: ${({theme}) => theme.colors.textColor3};
        width: 100%;
        height: 100%;
    }
`;

export const LocationInformationHeader = styled.p`
    color: ${({theme}) => theme.colors.textColor3};
    text-decoration: underline;
    margin: 0;
    
    ${media.mobile`
        font-size: ${v.fontSize.large};
        font-weight: ${v.fontWeight.bolder};
    `}
`;

export const LocationInformation = styled(Link)`
    display: flex;
    width: 100%;
    text-decoration: none;
`;

export const PinIconContainter = styled.div`
    color: ${({theme}) => theme.colors.textColor1};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
`;

export const Location = styled.p`
    overflow-wrap: break-word;
    white-space: pre-line;
    padding: ${v.spacing.small};
    padding-left: ${v.spacing.large};
    color: ${({theme}) => theme.colors.textColor3};

    ${media.mobile`
        font-size: calc(${v.fontSize.small} + 0.1rem);
        font-weight: ${v.fontWeight.bold};
    `}
`;