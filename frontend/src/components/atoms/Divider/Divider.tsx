import React from "react";
import { DividerContainer, DividerLine, DividerText } from "./Divider.styles.js";

type DividerProps = {
    dividerText?: string;
    className?: string;
}

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