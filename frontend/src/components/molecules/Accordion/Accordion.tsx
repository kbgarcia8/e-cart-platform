import React from "react";
import * as Styled from './Accordion.styles';
import type { AccordionProps } from "./Accordion.types";
import Button from "components/atoms/Button";

const Accordion = ({ 
    items,
    buttonColor,
    buttonRadius,
    indicator,
    handleActivatePanel,
    className 
}:AccordionProps)  => {
    return(
        <Styled.AccordionWrapper className={className}>
            {items.map((item, index) => (
                <>
                    <Styled.HeaderButtonWrapper $indicator={indicator}>
                        <Button radius={buttonRadius} color={buttonColor} text={item.headerText} onClick={handleActivatePanel} dataAttributes={{'data-index': index}}/>
                    </Styled.HeaderButtonWrapper>
                    <Styled.AccordionPanel>
                        <Styled.AccordionPanelContent>{item.content}</Styled.AccordionPanelContent>
                    </Styled.AccordionPanel>
                </>
            ))}
        </Styled.AccordionWrapper>
    )
};

export default Accordion;