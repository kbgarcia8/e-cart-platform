import styled from 'styled-components';
import { v } from 'constants/variables'
import Button from 'components/atoms/Button';
import Navbar from "components/molecules/Navbar";
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
    border: 2px solid red;
    background-color: ${({theme}) => theme.colors.screenColor};
    height: auto;
    ${media.mobile`
        width: 12.5%;
    `}
    ${media.desktop`
        width: 10%;
    `}
`;

export const MainHeaderLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: ${v.borderRadius.circle};
`;

export const PublicNavbar = styled(Navbar)`
    &.public-navbar{
        width: 70%;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    margin: 0;
    ${media.mobile`
        width: 25%;
    `}
    ${media.tablet`
        width: 20%;
    `}
`;

export const LoginButton = styled(Button)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    color: ${({theme}) => theme.colors.textColor3};
    border: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor2};
    border-radius: ${v.spacing.xxsmall};

    &:hover{
        background-color: ${({theme}) => theme.colors.backgroundColor2};
    }

    &:active {
        background-color: ${({theme}) => theme.colors.backgroundColor1};
        color: ${({theme}) => theme.colors.textColor3};
    }

    ${media.mobile`
        padding: 0;
        & span {
            font-size: calc(${v.fontSize.xxxsmall} + 0.15rem);
            width: 100%;
        }
    `}
    ${media.tablet`
        padding: ${v.spacing.xxxsmall} ${v.spacing.small};
        & span {
            font-size: ${v.fontSize.xsmall};
            width: 100%;
        }
    `}
`;

export const SignUpButton = styled(LoginButton)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.backgroundColor3};
    color: ${({theme}) => theme.colors.textColor1};
    border: 2px solid ${({theme}) => theme.colors.textColor1};    

    &:hover {
        background-color: ${({theme}) => theme.colors.backgroundColor4};
        color: ${({theme}) => theme.colors.screenColor};
    }

    &:active {
        background-color: ${({theme}) => theme.colors.backgroundColor3};
        color: ${({theme}) => theme.colors.textColor1};
    }
`;