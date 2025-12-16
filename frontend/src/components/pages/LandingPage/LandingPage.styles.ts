import styled from 'styled-components';
import { v } from 'constants/variables';
import Section from 'components/molecules/Section';

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
`;

export const MainSectionSloganSpace = styled.div`
    width: 50%;
`;