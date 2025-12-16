import styled from 'styled-components';
import { v } from 'constants/variables';
import { media } from 'utils/utility';

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-shadow: 0 -${v.spacing.xxxsmall} ${v.spacing.small} 0 ${({theme}) => theme.footerTheme.shadowColor};
    background-color: ${({theme}) => theme.footerTheme.backgroundColor};
    padding: ${v.spacing.medium};
`;
export const FooterMessage = styled.span`
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    width 100%;
    text-align: center;
    color: ${({theme}) => theme.footerTheme.textColor};
    ${media.mobile`
        font-size: ${v.fontSize.xsmall};
    `}
    ${media.tablet`
        font-size: ${v.fontSize.small};
    `}
`;