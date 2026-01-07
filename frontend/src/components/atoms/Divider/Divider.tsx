import React from "react";
import * as Styled from "./Divider.styles";
import type { DividerProps } from "./Divider.types";

const Divider = ({ dividerText, lineColor, thickness, textColor, textSize, className }:DividerProps) => {
    
    return(
        <Styled.DividerContainer className={className}>
            <Styled.DividerLine $lineColor={lineColor} $thickness={thickness}>
                {dividerText && <Styled.DividerText $textColor={textColor} $textSize={textSize}>{dividerText}</Styled.DividerText>}
            </Styled.DividerLine>
        </Styled.DividerContainer>
    );
}

export default Divider;