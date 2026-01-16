import styled from 'styled-components';
import { v } from 'shared/constants/variables';
import { Link } from "react-router-dom";
import { DynamicForm } from '@kbgarcia8/react-dynamic-form';

export const LoginPageWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`;

export const LoginPageHeader =  styled.h2`
    width: 100%;
    text-align: center;
`;

export const FormSpace = styled.div`
    display: flex;
`;

export const LoginForm = styled(DynamicForm)`
    background-color: ${({theme})=> theme.colors.bg};
    color: ${({theme})=> theme.colors.text};
    
    &.without-fieldsets{
        height: auto;
        padding: 1.25rem;
    }

    & .address-fieldset-wrapper{
        display: flex;
        flex-direction: column;
    }

    & fieldset{
        flex: 1;
        padding: 1rem;
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & legend {
        font-weight: 700;
    }
    
    & .login-form-label-n-input-container {
        width: 75%;
        padding: 0.5rem;
        justify-content: space-between;
    }
`;

export const SignUpMessageSpace = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
`;
export const SignUpMessage = styled.span`
    font-size: ${v.fontSize.small};
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback};
    color: ${({theme}) => theme.colors.textColor1};
`;
export const SignUpLink = styled(Link)`
    text-decoration: none;
    color: ${({theme}) => theme.colors.backgroundColor1};
    font-weight: bold;
    padding: ${v.spacing.xxxsmall};

    &:hover {
        color: ${({theme}) => theme.colors.backgroundColor2};
        text-decoration: underline;
    }
`;
