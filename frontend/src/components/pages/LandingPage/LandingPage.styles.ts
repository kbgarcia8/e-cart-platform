import styled from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';
import Section from 'components/molecules/Section';
import Button from 'components/atoms/Button/Button';
import ImageCarousel from 'components/molecules/ImageCarousel';

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
            border: 2px solid red;
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
    `}
`;