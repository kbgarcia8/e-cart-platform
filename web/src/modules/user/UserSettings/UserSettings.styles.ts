import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserSettingsWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const ThemeToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    border: 2px solid red;
`;

export const ThemeToggleButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%;
    border: 2px solid red;

    & button {
        height: 100%;
    }
`;

export const ThemeToggleText = styled.span`
    color: ${({theme}) => theme.colors.textColor1};
    font-size: ${v.fontSize.medium};
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 100%;
    border: 2px solid red;
`;