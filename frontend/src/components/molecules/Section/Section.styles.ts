import styled from "styled-components";
import { v } from "constants/variables";
import { media } from "utils/utility";
//Create variant of small, med, large h2 and h3
//Also for custom flex of h2 and h3
export const SectionWrapper = styled.section`
    background-color: transparent;
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    height: 100%;
    padding: ${v.spacing.medium};
    overflow: hidden;
`;

export const SectionTitle = styled.h2`
    text-align: left;
    font-weight: ${v.fontWeight.bolder};

    ${media.mobile`
        font-size: ${v.fontSize.large};
        flex: 2;
        display: flex;
        align-items: center;
        color: ${({theme}) => theme.colors.textColor3};
        text-shadow: ${v.spacing.xxsmall} ${v.spacing.xxsmall} ${v.spacing.xsmall} ${({theme}) => theme.notificationPalette.errorBackground};
        font-size: ${v.fontSize.giga};
        line-height: ${v.spacing.xlarge};
    `}
    
`;

export const SectionDescription = styled.h3`
    text-align: left;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};

    ${media.mobile`
        font-size: ${v.fontSize.small};
    `}
`;