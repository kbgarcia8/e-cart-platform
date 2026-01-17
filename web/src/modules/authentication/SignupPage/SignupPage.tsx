import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSignup } from "../authentication.hooks";
import type { SignupFormData } from "../authentication.types";
import type {inputEntryShape, LabeledTextLike } from '@kbgarcia8/react-dynamic-form';
import * as Styled from './SignupPage.styles';

const signupFormInputArray:inputEntryShape<false,LabeledTextLike>[] = [
    {
        type: "email" as const,
        id: "signup-username-email",
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
        password: '',
        confirmpassword: ''
    };

    useEffect(() => {
    if (error) {
            toast.error(error);
        }
    }, [error]);

    const [signupFormValues, setSignupFormValues] = useState<SignupFormData>(initialFormValues);

    const handleSignupFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof SignupFormData;
        const value = e.currentTarget.value;

        setSignupFormValues((prevSignupFormValues) => ({
            ...prevSignupFormValues,
            [datakey]: value
            }))
    }, []);
    
    
    const signupFormInputs = signupFormInputArray.map((input) => (
        {...input,
            value: signupFormValues[input.name as keyof SignupFormData],
            onChange: handleSignupFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    const handleFormSubmit = useCallback( async () => {
        await signup(signupFormValues)
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
                    submitText={'Signup'}
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