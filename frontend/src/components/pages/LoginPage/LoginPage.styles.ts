import styled from 'styled-components';
import { v } from 'constants/variables';
import { Link } from "react-router-dom";

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
