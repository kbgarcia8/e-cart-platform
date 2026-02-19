import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useLogin } from "../auth.hooks";
import type { LoginFormData } from "../auth.types";
import type {inputEntryShape, LabeledTextLike } from '@kbgarcia8/react-dynamic-form';
import * as Styled from './LoginPage.styles';
import { BounceLoader } from "react-spinners";
import { ImGoogle3 } from "react-icons/im";
import Button from "shared/ui/atoms/Button";

const loginFormInputArray:inputEntryShape<false,LabeledTextLike>[] = [
    {
        type: "email" as const,
        id: "login-username-email",
        isRequired: true,
        disabled: false,
        name: "email",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "loginform-label",
        inputClass: "loginform-input",
        isEditable: false as const,
        textLabel: 'Email'
    },
    {
        type: "password" as const,
        id: "login-password",
        isRequired: true,
        disabled: false,
        name: "password",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "loginform-label",
        inputClass: "loginform-input",
        isEditable: false as const,
        textLabel: 'Password',
    }
];

const LoginPage =() => {
    const { login, loading, error } = useLogin();
    const initialFormValues = {
        email: '',
        password: ''
    };

    useEffect(() => {
        console.error(error);
    }, [error]);

    const [loginFormValues, setLoginFormValues] = useState<LoginFormData>(initialFormValues);

    const handleLoginFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const datakey = e.currentTarget.dataset.key as keyof LoginFormData;
        const value = e.currentTarget.value;

        setLoginFormValues((prevLoginFormValues) => ({
            ...prevLoginFormValues,
            [datakey]: value
        }))
    }, []);
    
    
    const loginFormInputs = loginFormInputArray.map((input) => (
        {...input,
            value: loginFormValues[input.name as keyof LoginFormData],
            onChange: handleLoginFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    const handleFormSubmit = useCallback(async () => {
        try {
            await login(loginFormValues)
            toast.success("User login successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong during login!");
        }
    }, [login, loginFormValues]);
    

    return(
        <Styled.LoginPageWrapper>
            {!loading ?
            <React.Fragment>
                <Styled.LoginPageHeader>
                    Welcome to E-cart Platform! Login your account to continue.
                </Styled.LoginPageHeader>
                <Styled.FormSpace>
                    <Styled.LoginForm
                        className={'without-fieldsets'}
                        fieldsets={null}
                        formInputs={loginFormInputs || []}
                        id="login"
                        isExpandable={false}
                        inputClass={'login-form-input'}
                        labelClass={'login-form-label'}
                        labelAndInputContainerClass={'login-form-label-n-input-container'}
                        submitText={'Login with Email'}
                        handleSubmitForm={handleFormSubmit}
                    >
                        <Styled.AdditionalSigninOptionsSpace>
                            <Button buttonType="button" text="Sign in with Google" svg={<ImGoogle3 size={"1.25rem"}/>} onClick={() => {console.log('Sign in with Google')}}/>
                        </Styled.AdditionalSigninOptionsSpace>
                    </Styled.LoginForm>
                </Styled.FormSpace>
            </React.Fragment>
            : <BounceLoader/>}
            <Styled.SignUpMessageSpace>
                <Styled.SignUpMessage>
                    Don't have an account yet? <Styled.SignUpLink  to={`/auth/signup`}>{"Sign Up"}</Styled.SignUpLink> 
                </Styled.SignUpMessage>
            </Styled.SignUpMessageSpace>
        </Styled.LoginPageWrapper>
    )
};

export default LoginPage;