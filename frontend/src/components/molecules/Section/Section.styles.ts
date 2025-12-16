import styled from "styled-components";
import { v } from "constants/variables";
import { media } from "utils/utility";

export const SectionWrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
    padding: ${v.spacing.medium};
`;

export const SectionTitle = styled.h2`
    text-align: left;
    font-weight: ${v.fontWeight.bolder};

    ${media.mobile`
        font-size: ${v.fontSize.large};
    `}
    
`;

export const SectionDescription = styled.h3`
    text-align: left;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};

    ${media.mobile`
        font-size: ${v.fontSize.small};
    `}
`;