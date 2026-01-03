import React from "react";
import * as Styled from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const Button = ({
    onClick,
    id,
    buttonType="button",
    source,
    svg,
    alt = "alt-button-icon", 
    text = "",
    className = "",
    dataAttributes = {},
    $color,
    $radius,
    $size
}:ButtonProps) => {

    return (
        <Styled.DefaultButton
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            id={id}
            type={buttonType}
            className={className}
            {...dataAttributes}
            $color={$color}
            $radius={$radius}
        >
            <Styled.ButtonTextAndIconSpace className={"button-icon-text-space"} $hasIcon={Boolean(source || svg)} $hasText={Boolean(text)}>
                {source ? <Styled.ButtonIcon src={source} alt={alt} /> : svg ? svg : null}
                {text && <Styled.ButtonText $size={$size} id={id} >{text}</Styled.ButtonText>}
            </Styled.ButtonTextAndIconSpace>
        </Styled.DefaultButton>
    )
}

export default Button;