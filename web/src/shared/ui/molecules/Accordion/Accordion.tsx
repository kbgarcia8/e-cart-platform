import React from 'react';
import * as Styled from './Accordion.styles';
import type { AccordionProps } from "./Accordion.types";
import Button from "shared/ui/atoms/Button";

const Accordion = ({ 
    items,
    activePanel,
    buttonColor,
    buttonRadius,
    indicatorColor,
    indicatorString,
    indicatorSVGURL,
    panelColor,
    handleActivatePanel,
    className 
}:AccordionProps)  => {
    return(
        <Styled.AccordionWrapper className={className}>
            {items.map((item, index) => (
                <React.Fragment key={`${item.header}-${index}`}>
                    <Styled.HeaderButtonWrapper className={index === activePanel ? "active" : ""} $indicatorColor={indicatorColor} $indicatorString={indicatorString} $indicatorSVGURL={indicatorSVGURL}>
                        <Button buttonType={'button'} size={"large"} radius={buttonRadius} color={buttonColor} text={item.header} onClick={handleActivatePanel} dataAttributes={{'data-index': index}}/>
                    </Styled.HeaderButtonWrapper>
                    <Styled.AccordionPanel className={index === activePanel ? "active" : ""} $panelColor={panelColor}>
                        <Styled.AccordionPanelContent>{item.content}</Styled.AccordionPanelContent>
                    </Styled.AccordionPanel>
                </React.Fragment>
            ))}
        </Styled.AccordionWrapper>
    )
};

export default Accordion;