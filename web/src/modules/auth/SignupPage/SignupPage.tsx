import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSignup } from "../auth.hooks";
import type { SignUpData } from "../auth.types";
import type {inputEntryShape, LabeledTextLike } from '@kbgarcia8/react-dynamic-form';
import * as Styled from './SignupPage.styles';

const signupFormInputArray:inputEntryShape<false,LabeledTextLike>[] = [
    {
        type: "email" as const,
        id: "signup-email",
        isRequired: true,
        disabled: false,
        name: "email",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'Email'
    },
    {
        type: "text" as const,
        id: "signup-firstname",
        isRequired: true,
        disabled: false,
        name: "firstname",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'First Name'
    },
    {
        type: "text" as const,
        id: "signup-lastname",
        isRequired: true,
        disabled: false,
        name: "lastname",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'Last Name'
    },
    {
        type: "text" as const,
        id: "signup-username",
        isRequired: true,
        disabled: false,
        name: "username",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'Username'
    },
    {
        type: "password" as const,
        id: "signup-password",
        isRequired: true,
        disabled: false,
        name: "password",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'Password',
    },
    {
        type: "password" as const,
        id: "signup-confirmpassword",
        isRequired: true,
        disabled: false,
        name: "confirmpassword",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "signupform-label",
        inputClass: "signupform-input",
        isEditable: false as const,
        textLabel: 'Confirm Password',
    }
];

const SignupPage =() => {

    const { signup, loading, error } = useSignup();
    const initialFormValues = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        username: '',
        confirmpassword: ''
    };

    useEffect(() => {
    if (error) {
            toast.error(error);
        }
    }, [error]);

    const [signupFormValues, setSignupFormValues] = useState<SignUpData>(initialFormValues);

    const handleSignupFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof SignUpData;
        const value = e.currentTarget.value;

        setSignupFormValues((prevSignupFormValues) => ({
            ...prevSignupFormValues,
            [datakey]: value
            }))
    }, []);
    
    
    const signupFormInputs = signupFormInputArray.map((input) => (
        {...input,
            value: String(signupFormValues[input.name as keyof SignUpData]),
            onChange: handleSignupFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    const handleFormSubmit = useCallback( async () => {
        try {
            await signup(signupFormValues);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        }
    }, [signup, signupFormValues]);
    

    return(
        <Styled.SignupPageWrapper>
            <Styled.SignupPageHeader>
                Welcome to E-cart Platform! Signup to enjoy member perks.
            </Styled.SignupPageHeader>
            <Styled.FormSpace>
                <Styled.SignupForm
                    className={'without-fieldsets'}
                    fieldsets={null}
                    formInputs={signupFormInputs || []}
                    id="signup"
                    isExpandable={false}
                    inputClass={'signup-form-input'}
                    labelClass={'signup-form-label'}
                    labelAndInputContainerClass={'signup-form-label-n-input-container'}
                    submitText={'Signup with Email'}
                    handleSubmitForm={handleFormSubmit}
                />
            </Styled.FormSpace>
            <Styled.LoginMessageSpace>
                <Styled.LoginMessage>
                    Already signed up? Please login instead <Styled.LoginLink  to={`/login`}>{"Login"}</Styled.LoginLink> 
                </Styled.LoginMessage>
            </Styled.LoginMessageSpace>
        </Styled.SignupPageWrapper>
    )
}

export default SignupPage;