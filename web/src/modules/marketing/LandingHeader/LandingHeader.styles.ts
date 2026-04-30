import styled from 'styled-components';
import { v } from 'shared/constants/variables'
import { HashLink } from 'react-router-hash-link';
import { media } from 'shared/utils/utility';

export const LandingHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundColor1};
    border-bottom: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor1};
    padding-inline: ${v.spacing.small}
`;

export const LandingHeaderLogoSpace = styled(HashLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.screenColor};
    height: auto;
    border-radius: ${v.borderRadius.circle};
    overflow: hidden;

    ${media.mobile`
        flex: 0 0 15%;
        max-width: 15%;
    `}
    ${media.desktop`
        flex: 0 0 10%;
        max-width: 10%;
    `}
`;

export const LandingHeaderLogo = styled.img`
    width: 100%;
    height: auto;
`;

export const NavbarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${({theme}) => theme.colors.screenColor};
    min-height: 50%;
    max-height: 100%;
    height: 75%;
    
    ${media.mobile`
        flex: 0 0 85%;
        max-width: 85%;
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
    justify-content: space-around;
    height: 100%;
    margin: 0;
    padding-top: ${v.spacing.xsmall};
    padding-inline: ${v.spacing.xlarge};
    gap: ${v.spacing.medium};
    

    & > button {
        flex: 1;
        margin-inline: 0.25rem;
    }
    
    & button .button-icon-text-space {
        width: 100%;
    }
`;