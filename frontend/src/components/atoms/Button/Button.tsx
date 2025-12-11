import React from "react";
import * as Styled from "./Button.styles";
import type { ButtonProps } from "type/propTypes";

const Button = ({
    onClick,
    id,
    buttonType="button",
    source,
    svg,
    alt = "alt-button-icon", 
    text = "",
    className = "",
    dataAttributes = {}
}:ButtonProps) => {

    return (
        <Styled.DefaultButton
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            id={id}
            type={buttonType}
            className={className}
            {...dataAttributes}
        >
            <Styled.ButtonTextAndIconSpace className={"button-icon-text-space"}>
                {source ? <Styled.ButtonIcon src={source} alt={alt} /> : svg ? svg : ''}
                {text && <Styled.ButtonText id={id} >{text}</Styled.ButtonText>}
            </Styled.ButtonTextAndIconSpace>
        </Styled.DefaultButton>
    )
}

export default Button;