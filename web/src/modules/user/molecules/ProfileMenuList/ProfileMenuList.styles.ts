import styled from "styled-components";
import { v } from "shared/constants/variables";

export const ProfileMenuListContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: ${v.spacing.large};
`;

export const ProfileMenuListItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${v.spacing.small};
`;

export const ProfileMenuListItemText = styled.span`
    font-family: ${v.fonts.secondary};
    font-size: ${v.fontSize.xlarge};
    font-weight: ${v.fontWeight.medium};
    color: ${({theme}) => theme.colors.textColor1};
    margin-left: ${v.spacing.xsmall};
    width: 50%;
`;