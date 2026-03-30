import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { DynamicForm, type inputEntryShape, type LabeledTextLike} from "@kbgarcia8/react-dynamic-form";
import Button from "shared/ui/atoms/Button";
import type { UserProfile } from "shared/type/shared.types";
import { BounceLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import * as Styled from "./UserDetails.styles";
import useAuth from "shared/hooks/useAuth";

const detailsFormInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    profilePicture: ''
}

const UserDetails = () => {
    const navigate = useNavigate();
    const { user, authLoading } = useAuth();

    const userDetailsFormInputArray:inputEntryShape<false, LabeledTextLike>[] = [
        {
            type: "text" as const,
            id: "details-firstname",
            isRequired: true,
            disabled: true,
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
            disabled: true,
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
            disabled: true,
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
    ]

    useEffect(() => {
        Object.keys(detailsFormInitialValues).map((key) => (
            userDetailsFormInputArray.map((input) => {
                if(input.name == key && input.name !== 'email') {
                    detailsFormInitialValues[key as keyof UserProfile] = input.value
                }
            })
        ))
    }, [])

    const [detailsFormValues, setDetailsFormValues] = useState<UserProfile>(detailsFormInitialValues)

    if(authLoading) {
        return (
            <Styled.UserDetailsWrapper>
                <BounceLoader />
            </Styled.UserDetailsWrapper>
        );
    }

    if (!user) {
        navigate("/auth/login");
    }

    const handleUserDetailsFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof UserProfile;
        const value = e.currentTarget.value;
        
        setDetailsFormValues((prevDetailsFormValues) => ({
            ...prevDetailsFormValues,
            [datakey]: value
        }))
    }, []);

    const userDetailsFormInputs = userDetailsFormInputArray.map((input) => (
        {...input,
            //value: String(signupFormValues[input.name as keyof UserCreateData]),
            onChange: handleUserDetailsFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    const onClickEditButton = () => {}

    const handleSubmitForm = useCallback((e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('User details update form submitted')
        console.log(detailsFormValues)
    },[]);

    return (
        <Styled.UserDetailsWrapper>
            <Styled.UserProfilePictureSpace>
                <Styled.UserProfilePicture src={""} />
            </Styled.UserProfilePictureSpace>
            <Styled.Username>{`${user?.username}`}</Styled.Username>
            <Button
                onClick={onClickEditButton}
                buttonType="button"
                startIcon={<FaRegEdit/>}
            />
            <Styled.UserDetailsFormWrapper>
                <DynamicForm
                    formActionButtonColor="secondary"
                    formActionButtonSize="medium"
                    formActionButtonRadius="square"
                    className={'user-details-form'}
                    fieldsets={null}
                    formInputs={userDetailsFormInputs}
                    id="user-details"
                    isExpandable={false}
                    inputClass={'user-details-form-input'}
                    labelClass={'user-details-form-label'}
                    labelAndInputContainerClass={'user-details-form-label-n-input-container'}
                    submitText={'Update'}
                    handleSubmitForm={handleSubmitForm}
                />
            </Styled.UserDetailsFormWrapper>
        </Styled.UserDetailsWrapper>
    );
};

export default UserDetails;