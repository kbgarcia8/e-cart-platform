import React from "react";
import { DividerContainer, DividerLine, DividerText } from "./Divider.styles.js";
import type { DividerProps } from "type/propTypes";


const Divider = ({ dividerText, className }:DividerProps) => {
    
    return(
        <DividerContainer className={className}>
            <DividerLine>
                {dividerText && <DividerText>{dividerText}</DividerText>}
            </DividerLine>
        </DividerContainer>
    );
}

export default Divider;