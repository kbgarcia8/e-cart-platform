import styled from "styled-components";
import type { AccordionProps } from "./Accordion.types";

export const AccordionWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const HeaderButtonWrapper = styled.div<{$indicator: Pick<AccordionProps,'indicator'>}>`
    width: 100%;

    &::after {
        content:
    }
`;

export const AccordionPanel = styled.div`

`;

export const AccordionPanelContent = styled.p``;