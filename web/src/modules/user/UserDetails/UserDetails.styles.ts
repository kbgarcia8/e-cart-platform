import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserDetailsWrapper = styled.div`
    padding-inline: ${v.spacing.large};
    padding-block: ${v.spacing.small};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: ${v.spacing.xlarge};
`;

export const UserProfilePictureSpace = styled.div`
    width: 100%;
    height: 22.5%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UserProfilePicture = styled.img`
    border-radius: ${v.borderRadius.circle};
    border: ${v.spacing.xxsmall} double ${({theme}) => theme.colors.textColor1};
    width: 50%;
    height: 100%;
`;

export const UsernameWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5%;
`;

export const Username = styled.span`
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: ${v.spacing.large};
    font-size: ${v.fontSize.large};
    font-family: ${v.fonts.secondary};
    font-weight: ${v.fontWeight.bolder};
    text-decoration: underline;
`;

export const EditButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    height: 100%;
`;

export const UserDetailsFormWrapper = styled.div`
    width: 100%;
    height: 47.5%;
    border-radius: ${v.borderRadius.large};
    border: 2px solid red;

    & legend {
        font-weight: ${v.fontWeight.bolder};
    }

    #user-details-form,
    .user-details-fieldset-wrapper {
        height: 100%;
    }

    #user-details-form-fieldset {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-block: ${v.spacing.large};
        row-gap: 0.25rem;
        border: none;
    }

    .user-details-form-label {
        display: flex;
        align-items: flex-start;
        font-size: ${v.fontSize.medium};
    }

    .user-details-form-input{
        font-size: ${v.fontSize.small};
    }
`;