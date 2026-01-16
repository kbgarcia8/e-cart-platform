import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const DefaultInput = styled.input`
    display: flex;
    place-content: center;
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-size: ${v.fontSize.xsmall};
    line-height: 1.75;
    padding: ${v.spacing.xxxsmall} ${v.spacing.xsmall};
    max-width: 100%;
    height: auto;
    background-color: #FFFFFF;
    outline: none;
    border: ${v.borderThickness.thin} solid #000000;
    border-radius: ${v.borderRadius.xsmall};

    &:focus{
        border: ${v.borderThickness.thin} solid ${({theme}) => theme.colors.teal};
    }
`;

export const TextArea = styled.textarea`
    display: flex;
    place-content: center;
    border: ${v.borderThickness.light} solid ${({theme}) => theme.colors.text};
    border-radius: ${v.borderRadius.small};
    outline: none;
    line-height: ${v.spacing.small};
    padding: ${v.spacing.xxxsmall};
    font-family: ${v.fonts.secondary}, ${v.fonts.fallback};
    font-size: ${v.fontSize.xsmall};
    max-width: 100%;
    resize: none;
    overflow-y: auto;
`;