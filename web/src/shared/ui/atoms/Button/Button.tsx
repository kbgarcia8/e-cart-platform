import React from "react";
import * as Styled from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const Button = ({
    onClick,
    id,
    buttonType="button",
    startIcon,
    endIcon,
    text = "",
    className = "",
    dataAttributes = {},
    color,
    radius,
    size
}:ButtonProps) => {
    if(buttonType === 'submit') {
        return (
            <Styled.DefaultButton
                id={id}
                type={'submit'}
                className={className}
                {...dataAttributes}
                $color={color}
                $radius={radius}
            >
                <Styled.ButtonTextAndIconSpace className={"button-icon-text-space"} $hasIcon={Boolean(startIcon || endIcon)} $hasText={Boolean(text)}>
                    {startIcon ? startIcon : ''}
                    {text && <Styled.ButtonText $size={size} id={id} >{text}</Styled.ButtonText>}
                    {endIcon ? endIcon : ''}
                </Styled.ButtonTextAndIconSpace>
            </Styled.DefaultButton>
        )
    }

    return (
        <Styled.DefaultButton
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            id={id}
            type={buttonType}
            className={className}
            {...dataAttributes}
            $color={color}
            $radius={radius}
        >
            <Styled.ButtonTextAndIconSpace className={"button-icon-text-space"} $hasIcon={Boolean(startIcon || endIcon)} $hasText={Boolean(text)}>
                {startIcon ? startIcon : ''}
                {text && <Styled.ButtonText $size={size} id={id} >{text}</Styled.ButtonText>}
                {endIcon ? endIcon : ''}
            </Styled.ButtonTextAndIconSpace>
        </Styled.DefaultButton>
    )
}

export default Button;