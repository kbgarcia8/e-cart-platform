import styled from "styled-components";
import { v } from "shared/constants/variables";
import type { LabelProps } from "./Label.types";

export const DefaultLabel = styled.label<Pick<LabelProps, '$labelFlexDirection'>>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    flex-direction:  ${(props) => props.$labelFlexDirection || "column"};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-size: ${v.fontSize.xsmall};
    font-weight: ${v.fontWeight.bold};
    gap: ${v.spacing.xxsmall};
    
    & .label-icon-container img,
    & .label-icon-container svg {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }
`;

export const LabelTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${v.spacing.xxxsmall};
`;

export const MainLabelText = styled.span`
    font-weight: ${v.fontWeight.bolder};
`;

export const LabelIconContainer = styled.div`
    max-width: 100%;
    display: flex;
    align-items: center;
`;

export const LabelAdditionalInfo = styled.span`
    font-weight: ${v.fontWeight.light};
`;