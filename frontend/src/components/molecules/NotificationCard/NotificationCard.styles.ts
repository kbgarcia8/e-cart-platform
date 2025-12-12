import styled from 'styled-components';
import Button from 'components/atoms/Button';
import { v } from 'constants/variables';
import type { ColorString } from 'type/generalTypes';
import type { ButtonProps } from 'type/propTypes';

export const NotificationImage = styled.img`
    width: 5%;
`;

export const NotifcationMessage = styled.span<{$textColor: ColorString}>`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: ${v.spacing.medium};
    font-size: ${v.fontSize.small};
    font-family: ${v.fonts.tertiary};
    color: ${({$textColor}) => $textColor};
`;

export const NotificationCloseButton = styled(Button)<{$textColor: ColorString} & ButtonProps>`
    background-color: transparent;
    border: none;
    width: 7.5%;
    height: 2.5vmin;
    color: ${({$textColor}) => $textColor};
    && .button-icon-and-text span {
        font-size: ${v.fontSize.xsmall};
        font-weight: ${v.fontWeight.bolder};        
    }
`;

export const NotificationCardWrapper = styled.div<{$backgroundColor: ColorString, $borderColor: ColorString}>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${v.spacing.medium};
    margin: ${v.spacing.xxsmall};
    max-width: 100%;
    height: 20%;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    border-radius: ${v.borderRadius.small};
    border: 2px solid ${({$borderColor}) => $borderColor};
`;