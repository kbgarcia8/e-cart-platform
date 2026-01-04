import React from "react";
import useTheme from "hooks/useTheme";
import { palette, lightTheme } from "styles/theme";
import * as Styled from "./Stepper.styles";
import type { StepperProps } from "./Stepper.types";


const Stepper = ({ stepperState, increment, incrementButtonText, decrementButtonText, decrement, dataAttributes, className }:StepperProps) => {

    const { currentTheme } = useTheme();

    const currentThemeSwitch = {
            color: currentTheme == lightTheme ? palette.neutral4 : palette.neutral3,
            counterTextColor: currentTheme == lightTheme ? palette.neutral5 : palette.neutral2,
            buttonTextColor: currentTheme == lightTheme ? palette.neutral2 : palette.neutral5,
        }

    return (
        <Styled.StepperContainer $color={currentThemeSwitch.color} className={className}>
            <Styled.StepperButton buttonType={'button'} $color={currentThemeSwitch.color} $textColor={currentThemeSwitch.buttonTextColor} onClick={decrement} text={decrementButtonText} dataAttributes={dataAttributes}/>
            <Styled.StepperState $color={currentThemeSwitch.color} $textColor={currentThemeSwitch.counterTextColor} className={"stepper-state"}>{stepperState}</Styled.StepperState>
            <Styled.StepperButton buttonType={'button'} $color={currentThemeSwitch.color} $textColor={currentThemeSwitch.buttonTextColor} onClick={increment}  text={incrementButtonText} dataAttributes={dataAttributes}/>
        </Styled.StepperContainer>
    );
}

export default Stepper;