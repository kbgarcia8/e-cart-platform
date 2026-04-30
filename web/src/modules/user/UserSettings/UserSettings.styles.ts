import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserSettingsWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: ${v.spacing.medium};
`;

export const UserSettingsHeader = styled.h2`
    bottom: 10%;
    position: relative;
`;

export const ThemeToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    border: 2px solid red;
`;

export const ThemeToggleIconContainer = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ThemeToggleButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
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
    width: 70%;
    height: 100%;
    border: 2px solid red;
`;

export const ToggleSwitchWrapper = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
`;

export const ToggleSwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    

    &:checked + .slider-round {
        background-color: ${({theme}) => theme.colors.backgroundColor3};
    }

    &:checked + .slider-round>svg {
        -webkit-transform: translateX(0px);
        -ms-transform: translateX(0px);
        transform: translateX(0px);
    }

    &:focus + .slider-round {
        box-shadow: 0 0 1px ${({theme}) => theme.colors.backgroundColor2};
    }

    &:checked + .slider-round:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

export const ToggleSwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    padding-inline: ${v.spacing.xxsmall};
    background-color: ${({theme})=> theme.colors.backgroundColor1};
    color: ${({theme})=> theme.colors.textColor3};

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    &.slider-round {
        border-radius: ${v.borderRadius.large};
        display: flex;
        align-items: center;
    }
    
    &.slider-round>svg {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    &.slider-round:before {
        border-radius: 50%;
    }
`;

export const PaymentMethodsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 10%;
    border: 2px solid red;
`;

export const PaymentMethodsIconContainer = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PaymentMethodsText = styled.span`
    color: ${({theme}) => theme.colors.textColor1};
    font-size: ${v.fontSize.medium};
    font-weight: ${v.fontWeight.bolder};
    font-family: ${v.fonts.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    border: 2px solid red;
`;

export const RightArrowContainer = styled.span`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;