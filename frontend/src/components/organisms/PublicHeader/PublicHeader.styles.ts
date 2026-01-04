import styled from 'styled-components';
import { v } from 'constants/variables'
import { HashLink } from 'react-router-hash-link';
import { media } from 'utils/utility';

export const MainHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    background-color: ${({theme}) => theme.colors.screenColor};
    border-bottom: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor1};
    padding-inline: ${v.spacing.xxxsmall}
`;

export const MainHeaderLogoSpace = styled(HashLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.screenColor};
    height: auto;
    ${media.mobile`
        flex: 0 0 12.5%;
        max-width: 12.5%;
    `}
    ${media.desktop`
        flex: 0 0 10%;
        max-width: 10%;
    `}
`;

export const MainHeaderLogo = styled.img`
    width: 100%;
    height: auto;
    border-radius: ${v.borderRadius.circle};
`;

export const NavbarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    ${media.mobile`
        flex: 0 0 87.5%;
        max-width: 87.5%;
    `}
    ${media.desktop`
        flex: 0 0 90%;
        max-width: 90%;
    `}

    & > nav {
        flex: 2;
    }
`;

export const ButtonWrapper = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    padding-top: ${v.spacing.xsmall};
    padding-inline: ${v.spacing.xxlarge};

    & > button {
        flex: 1;
        margin-inline: 0.25rem;
    }
`;