import React from "react";
import * as Styled from "./Label.styles";
import type { LabelProps } from "./Label.types";

const Label = ({
    htmlFor, 
    textLabel, 
    additionalInfo, 
    $labelFlexDirection, 
    source, 
    svg,
    className,
    children
}: React.PropsWithChildren<LabelProps>) => {
    return(
        <Styled.DefaultLabel htmlFor={htmlFor} className={className} $labelFlexDirection={$labelFlexDirection}>
            {(source || svg) && <Styled.LabelIconContainer className={"label-icon-container"}>
                {source ? <img src={source} alt={`${htmlFor}-label-icon`} /> : svg ? svg : ''}
            </Styled.LabelIconContainer>}
            <Styled.LabelTextContainer className={"label-text-container"}>
                <Styled.MainLabelText className={"main-label"}>{textLabel}</Styled.MainLabelText>
                {additionalInfo && <Styled.LabelAdditionalInfo className={"additional-info"} >{additionalInfo}</Styled.LabelAdditionalInfo>}
            </Styled.LabelTextContainer>
            {children}
        </Styled.DefaultLabel>
    )
}

export default Label;