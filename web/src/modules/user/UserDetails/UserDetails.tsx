import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { DynamicForm, type inputEntryShape, type LabeledTextLike} from "@kbgarcia8/react-dynamic-form";
import Button from "shared/ui/atoms/Button";
import type { UserProfile } from "shared/type/shared.types";
import type { UserProfileFormData } from "../user.types";
import { BounceLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import * as Styled from "./UserDetails.styles";
import useAuth from "shared/hooks/useAuth";
import { useProfileUpdate } from "../user.hooks";
import { toast } from 'react-toastify';

const detailsFormInitialValues = {
    userId: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    profilePicture: ''
}

const UserDetails = () => {
    const navigate = useNavigate();
    const { user, authLoading } = useAuth();
    const [detailsFormValues, setDetailsFormValues] = useState<UserProfileFormData>(detailsFormInitialValues);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { updateProfile, profileUpdateLoading } = useProfileUpdate();

    //console.log(user?.profilePicture)

    const userDetailsFormInputArray:inputEntryShape<false, LabeledTextLike>[] = [
        {
            type: "text" as const,
            id: "details-firstname",
            isRequired: true,
            name: "firstname",
            value: user?.firstName ?? '',
            $labelFlexDirection: "column" as const,
            labelClass: "detailsform-label",
            inputClass: "detailsform-input",
            isEditable: false as const,
            textLabel: 'First Name'
        },
        {
            type: "text" as const,
            id: "details-lastname",
            isRequired: true,
            name: "lastname",
            value: user?.lastName ?? '',
            $labelFlexDirection: "column" as const,
            labelClass: "detailsform-label",
            inputClass: "detailsform-input",
            isEditable: false as const,
            textLabel: 'Last Name'
        },
        {
            type: "text" as const,
            id: "details-username",
            isRequired: true,
            name: "username",
            value: user?.username ?? '',
            $labelFlexDirection: "column" as const,
            labelClass: "detailsform-label",
            inputClass: "detailsform-input",
            isEditable: false as const,
            textLabel: 'Username'
        },
        {
            type: "email" as const,
            id: "details-email",
            isRequired: true,
            disabled: true,
            name: "email",
            value: user?.email ?? '',
            $labelFlexDirection: "column" as const,
            labelClass: "detailsform-label",
            inputClass: "detailsform-input",
            isEditable: false as const,
            textLabel: 'Email'
        }
    ];
    
    //? Needed to use useEffect to initialize non-empty initial values
    useEffect(() => {
        if(!user) return

        setDetailsFormValues({
            userId: user.id,
            firstname: user.firstName ?? '',
            lastname: user.lastName ?? '',
            username: user.username ?? '',
            email: user.email ?? '',
            profilePicture: user.profilePicture ?? ''
        });
    }, [user]);

    const handleUserDetailsFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof UserProfile;
        const value = e.currentTarget.value;
        
        setDetailsFormValues((prevDetailsFormValues) => ({
            ...prevDetailsFormValues,
            [datakey]: value
        }))
    }, [detailsFormValues]);

    const userDetailsFormInputs = userDetailsFormInputArray.map((input) => (
        {...input,
            value: String(detailsFormValues[input.name as keyof UserProfile] ?? ''),
            disabled: input.name !== 'email' ? !isEditing : input.disabled,
            onChange: handleUserDetailsFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));
    
    const onClickEditButton = () => {
        setIsEditing(prev => !prev)
    };

    const onClickCancelButton = () => {
        navigate('/user/profile');
    }

    const handleSubmitForm = useCallback(async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('User details update form submitted')
        console.log(detailsFormValues);
        try {
            const api = await updateProfile(detailsFormValues);
            toast.success(`${api?.message}` || 'User Profile updated successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong during user details update!");
        } finally {
            setIsEditing(false)
        }
    },[updateProfile, detailsFormValues]);

    if(authLoading || profileUpdateLoading) {
        return (
            <Styled.UserDetailsWrapper>
                <BounceLoader />
            </Styled.UserDetailsWrapper>
        );
    }

    if (!user) {
        navigate("/auth/login");
        return null;
    }

    return (
        <Styled.UserDetailsWrapper>
            <Styled.UserProfilePictureSpace>
                <Styled.UserProfilePicture src={user.profilePicture} />
            </Styled.UserProfilePictureSpace>
            <Styled.UsernameWrapper>
                <Styled.Username>{`${user?.username}`}</Styled.Username>
                <Styled.EditButtonContainer>
                    <Button
                        onClick={onClickEditButton}
                        buttonType="button"
                        startIcon={isEditing ? <GiCancel/> : <FaRegEdit/>}
                    />
                </Styled.EditButtonContainer>
            </Styled.UsernameWrapper>
            <Styled.UserDetailsFormWrapper>
                <DynamicForm
                    formActionButtonColor="secondary"
                    formActionButtonSize="medium"
                    formActionButtonRadius="square"
                    className={'user-details-form'}
                    legendText={'User Information'}
                    fieldsets={null}
                    formInputs={userDetailsFormInputs || []}
                    id="user-details"
                    isExpandable={false}
                    inputClass={'user-details-form-input'}
                    labelClass={'user-details-form-label'}
                    labelAndInputContainerClass={'user-details-form-label-n-input-container'}
                    submitText={'Update'}
                    handleSubmitForm={handleSubmitForm}
                    hasCancel
                    cancelText={"Back to Profile"}
                    handleCancel={onClickCancelButton}
                />
            </Styled.UserDetailsFormWrapper>
        </Styled.UserDetailsWrapper>
    );
};

export default UserDetails;