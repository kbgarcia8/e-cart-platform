import React from "react";
import * as Styled from './Accordion.styles';
import type { AccordionProps } from "./Accordion.types";
import Button from "components/atoms/Button";

const Accordion = ({ 
    items,
    activePanel,
    buttonColor,
    buttonRadius,
    indicatorString,
    indicatorSVGURL,
    handleActivatePanel,
    className 
}:AccordionProps)  => {
    return(
        <Styled.AccordionWrapper className={className}>
            {items.map((item, index) => (
                <>
                    <Styled.HeaderButtonWrapper className={index === activePanel ? "active" : ""} $indicatorString={indicatorString} $indicatorSVGURL={indicatorSVGURL}>
                        <Button size={"large"} radius={buttonRadius} color={buttonColor} text={item.header} onClick={handleActivatePanel} dataAttributes={{'data-index': index}}/>
                    </Styled.HeaderButtonWrapper>
                    <Styled.AccordionPanel className={index === activePanel ? "active" : ""}>
                        <Styled.AccordionPanelContent>{item.content}</Styled.AccordionPanelContent>
                    </Styled.AccordionPanel>
                </>
            ))}
        </Styled.AccordionWrapper>
    )
};

export default Accordion;