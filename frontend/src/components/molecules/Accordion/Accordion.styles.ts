import styled, { css } from "styled-components";
import { v } from "constants/variables";
import type { AccordionProps } from "./Accordion.types";
import { media } from "utils/utility";

export const AccordionWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const HeaderButtonWrapper = styled.div<{
    $indicatorString?: string;
    $indicatorSVGURL?: string;
}>`
    flex: 0 0 1;
    width: 100%;
    &::after {
        ${({ $indicatorString, $indicatorSVGURL }) => {
            if (!$indicatorString && !$indicatorSVGURL) {
            return css`content: "+";`;
            }

            if ($indicatorString) {
            return css`content: "${$indicatorString}";`;
            }
            return css`content: url(${$indicatorSVGURL});`;
        }}
        position: relative;
        right: ${v.spacing.small};
        top: 50%;
        transform: translateY(-50%);

        font-size: ${v.fontSize.large};
        font-weight: ${v.fontWeight.bold};
        pointer-events: none;
    }
    &.active::after {
        ${({ $indicatorString, $indicatorSVGURL }) => {
            if (!$indicatorString && !$indicatorSVGURL) {
            return css`content: "-";`;
            }

            if ($indicatorString) {
            return css`content: "${$indicatorString}";`;
            }
            return css`content: url(${$indicatorSVGURL});`;
        }}
    }
`;

export const AccordionPanel = styled.div`
    flex: 0 0 2;
    display: none;

    &.active {
        display: block;
    }
`;

export const AccordionPanelContent = styled.p`
    overflow-wrap: break-word;
    width: 100%;

    ${media.mobile`
        font-size: ${v.fontSize.medium};
    `}
`;