import styled, { css } from "styled-components";
import { v } from "constants/variables";
import { media } from "utils/utility";

export const AccordionWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    

    ${media.mobile`
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;

    `}
    ${media.tablet`
        display: flex;
        flex-direction: column;
    `}
`;

export const HeaderButtonWrapper = styled.div<{
    $indicatorString?: string;
    $indicatorSVGURL?: string;
}>`
    display: flex;
    border: 2px solid red;
    flex: 1;
    width: 100%;
    height: 100%;

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
        background-color: inherit;
        color: inherit;
        position: relative;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);

        font-size: ${v.fontSize.xlarge};
        font-weight: ${v.fontWeight.bolder};
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
    flex: 2;
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