import styled from 'styled-components';
import { v } from 'constants/variables'
import Button from 'components/atoms/Button';
import type { ButtonProps } from 'type/propTypes';

export const MainHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.colors.screenColor};
    border-bottom: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor1};
`;

export const MainHeaderLogoSpace = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.screenColor};
`;

export const MainHeaderLogo = styled.img`
    width: 100%;
    height: 100%;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 20%;
    height: 100%;
    margin: 0;
`;

export const LoginButton = styled(Button)`
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    color: ${({theme}) => theme.colors.textColor3};
    border: ${v.borderThickness.light} solid ${({theme}) => theme.colors.borderColor2};
    width: 45%;
    border-radius: ${v.spacing.xxsmall};

    &:hover{
        background-color: ${({theme}) => theme.colors.backgroundColor2};
    }

    &:active {
        background-color: ${({theme}) => theme.colors.backgroundColor1};
        color: ${({theme}) => theme.colors.textColor3};
    }
`;

export const SignUpButton = styled(LoginButton)`
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