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

export const NavbarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${({theme}) => theme.colors.screenColor};
    width: 100%;
    margin-block: ${v.spacing.xsmall};
`;

export const FooterMessage = styled.span`
    flex: 1;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    width 100%;
    text-align: center;

    color: ${({theme}) => theme.footerTheme.textColor};
    ${media.mobile`
        font-size: ${v.fontSize.small};
    `}
    ${media.tablet`
        font-size: ${v.fontSize.medium};
    `}
`;