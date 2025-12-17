import styled from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';
import Section from 'components/molecules/Section';
import Button from 'components/atoms/Button/Button';

export const LandingPageWrapper = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100%;
`;

export const MainSection = styled(Section)`
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    

    ${media.mobile`
        & h2 {
            flex: 1;
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

export const MainSectionSpace = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const ExploreMenuButton = styled(Button)`
    align-self: center;
    flex: 1;
    ${media.mobile`
        width: 50%;
        & .button-icon-text-space span{
            font-size: ${v.fontSize.medium};
            font-weight: ${v.fontWeight.bolder};
        }
    `}
`;

export const ImageCarouselSpace = styled.div`
    flex: 4;
    width: 100%;
`;