import styled from 'styled-components';
import {v} from 'constants/variables';

export const DividerLine = styled.div`
    width: 100%;
    height: 0.25vmax;
    border: 1px solid ${({theme}) => theme.colors.backgroundColor1};
    background-color: ${({theme}) => theme.colors.backgroundColor1};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DividerText = styled.span` 
    font-size: ${v.fontSize.medium};
    font-family: ${v.fonts.tertiary}, ${v.fonts.fallback}
    line-height: 1.25vmax;
    padding-inline: ${v.spacing.xsmall};
    color: ${({theme}) => theme.colors.textColor1};
    background-color: ${({theme}) => theme.colors.screenColor};
    position: relative;
`;

export const DividerContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 2vmax;
`;

export default {DividerLine, DividerText, DividerContainer};