import styled from "styled-components";
import { v } from "shared/constants/variables";
import { Link } from "react-router-dom";

export const ProfileMenuListContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: ${v.spacing.large};
`;

export const ProfileMenuListItemContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${v.spacing.small};
    border-radius: ${v.borderRadius.medium};
    border: 2px solid transparent;
    box-shadow: 0 ${v.spacing.small} ${v.spacing.medium} rgba(0, 0, 0, 0.1);

    

    &:link {
        color: ${({theme}) => theme.colors.textColor1};
        text-decoration: none;
    }
`;

export const ProfileMenuListItemText = styled.span`
    font-family: ${v.fonts.secondary};
    font-size: ${v.fontSize.xlarge};
    font-weight: ${v.fontWeight.medium};
    color: ${({theme}) => theme.colors.textColor1};
    margin-left: ${v.spacing.xsmall};
    width: 50%;
`;