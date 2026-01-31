import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { useSignup } from "../auth.hooks";
import type { UserCreateData } from "../auth.types";
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
        isRequired: false,
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

    const { signup, loading, successSignup, error } = useSignup();
    const initialFormValues = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        username: '',
        confirmpassword: ''
    };

    console.log(error);

    const [signupFormValues, setSignupFormValues] = useState<UserCreateData>(initialFormValues);

    const handleSignupFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof UserCreateData;
        const value = e.currentTarget.value;

        setSignupFormValues((prevSignupFormValues) => ({
            ...prevSignupFormValues,
            [datakey]: value
            }))
    }, []);
    
    
    const signupFormInputs = signupFormInputArray.map((input) => (
        {...input,
            value: String(signupFormValues[input.name as keyof UserCreateData]),
            onChange: handleSignupFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    const handleSubmitForm = useCallback( async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signup(signupFormValues);
            toast.success("User created successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong!");
        }
    }, [signup, signupFormValues]);
    
    return(
        <Styled.SignupPageWrapper>
            {!loading
            ? <React.Fragment>
                <Styled.SignupPageHeader>
                    Welcome to E-cart Platform! Signup to enjoy member perks.
                </Styled.SignupPageHeader>
                {successSignup ? <Styled.VerifyEmailHeader>Email Verification was sent to your email. Please verify to login!</Styled.VerifyEmailHeader> :null}
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
                        handleSubmitForm={handleSubmitForm}
                    />
                </Styled.FormSpace>
            </React.Fragment>
            : <BounceLoader/>
            }
            <Styled.LoginMessageSpace>
                <Styled.LoginMessage>
                    Already signed up? Please login instead <Styled.LoginLink  to={`/login`}>{"Login"}</Styled.LoginLink> 
                </Styled.LoginMessage>
            </Styled.LoginMessageSpace>
        </Styled.SignupPageWrapper>
    )
}

export default SignupPage;