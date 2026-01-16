import styled from 'styled-components';
import Button from 'shared/ui/atoms/Button';
import type { ColorString } from 'shared/type/generalTypes';
import type { ButtonProps } from 'shared/ui/atoms/Button/Button.types';

export const StepperButton = styled(Button)<{$color: ColorString, $textColor: ColorString} & ButtonProps>`
    border-radius: 0;
    padding: 0;
    margin: 0;
    background-color: gray;
    color: white;
    width: 25%;
    height: 100%;
    background-color: ${({$color}) => $color};
    border: none;
    & .button-icon-and-text span {
        font-size: 1.5rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        color: ${({$textColor}) => $textColor};
    }
`;

export const StepperState = styled.span<{$color: ColorString, $textColor: ColorString}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    border-inline: 2px solid ${({$color}) => $color};
    color: ${({$textColor}) => $textColor};
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const StepperContainer = styled.div<{$color: ColorString}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1.5px solid ${({$color}) => $color};
    height: 5vh;
    width: 25%;
    border-radius: 0.25rem;
`;