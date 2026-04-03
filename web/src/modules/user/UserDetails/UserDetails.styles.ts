import styled from 'styled-components';
import { v } from 'shared/constants/variables';

export const UserDetailsWrapper = styled.div`
    padding: ${v.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const UserProfilePictureSpace = styled.div`
    width: 100%;
    height: 20%;
    border: 2px solid red;
`;

export const UserProfilePicture = styled.img`
    border-radius: ${v.borderRadius.circle};
    width: 100%;
    height: 100%;
`;

export const UsernameWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5%;
    border: 2px solid red;
`;

export const Username = styled.span`
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: ${v.spacing.large};
    font-size: ${v.fontSize.medium};
    font-family: ${v.fonts.secondary};
    font-weight: ${v.fontWeight.bolder};
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
    height: 65%;
    border-radius: ${v.borderRadius.large};
    

    #user-details-form,
    .user-details-fieldset-wrapper {
        height: 100%;
    }

    #user-details-form-fieldset {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-block: ${v.spacing.large};
        row-gap: 1rem;
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