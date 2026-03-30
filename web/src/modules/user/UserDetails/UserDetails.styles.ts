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

export const Username = styled.span`
    
`;

export const UserDetailsFormWrapper = styled.div`
    width: 100%;
    height: 60%;
`;