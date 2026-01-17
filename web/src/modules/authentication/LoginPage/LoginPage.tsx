import React, { useState, useCallback, useEffect, useRef} from "react";
import { toast } from "react-toastify";
import { useLogin } from "../authentication.hooks";
import type { LoginFormData } from "../authentication.types";
import type {inputEntryShape, LabeledTextLike } from '@kbgarcia8/react-dynamic-form';
import * as Styled from './LoginPage.styles';

const loginFormInputArray:inputEntryShape<false,LabeledTextLike>[] = [
    {
        type: "text" as const,
        id: "login-username-email",
        isRequired: true,
        disabled: false,
        name: "username",
        value: '',
        $labelFlexDirection: "column" as const,
        labelClass: "loginform-label",
        inputClass: "loginform-input",
        isEditable: false as const,
        textLabel: 'Username or Email'
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
    const initialized = useRef(false);

    const { login, loading, error } = useLogin();
    const initialFormValues = {
        username: '',
        password: ''
    };

    useEffect(() => {
    if (error) {
            toast.error(error);
        }
    }, [error]);

    const [loginInputValues, setLoginInputValues] = useState<inputEntryShape<false,LabeledTextLike>[] | null>(null);
    const [loginFormValues, setLoginFormValues] = useState<LoginFormData>(initialFormValues);

    const handleLoginFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { key } = e.currentTarget.dataset;
        const value = e.currentTarget.value;

        setLoginInputValues((prevLoginInputValues) =>(
            prevLoginInputValues
            ? prevLoginInputValues.map((input) => 
                input.name == key
                ? {...input,
                    value: value
                }
                : input
            )
            : prevLoginInputValues
        ))

        setLoginFormValues((prevLoginFormValues) =>
            prevLoginFormValues ?
            {...prevLoginFormValues,
                key: value
            } : prevLoginFormValues
        )
    }, []);
    
    
    const loginFormInputs = loginFormInputArray.map((input) => (
        {...input,
            onChange: handleLoginFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ));

    useEffect(() =>{
        if(!initialized.current) {
            setLoginInputValues(loginFormInputs);
            initialized.current = true;
        }
    },[loginFormInputs]);

    const handleFormSubmit = useCallback( async () => {
        await login(loginFormValues)
    }, [login, loginFormValues]);
    

    return(
        <Styled.LoginPageWrapper>
            <Styled.LoginPageHeader>
                Welcome to Kain at Kape Website! Login your account to continue.
            </Styled.LoginPageHeader>
            <Styled.FormSpace>
                <Styled.LoginForm
                    className={'without-fieldsets'}
                    fieldsets={null}
                    formInputs={loginInputValues || []}
                    id="login"
                    isExpandable={false}
                    inputClass={'login-form-input'}
                    labelClass={'login-form-label'}
                    labelAndInputContainerClass={'login-form-label-n-input-container'}
                    submitText={'Login'}
                    handleSubmitForm={handleFormSubmit}
                />
            </Styled.FormSpace>
            <Styled.SignUpMessageSpace>
                <Styled.SignUpMessage>
                    Don't have an account yet? <Styled.SignUpLink  to={`/signup`}>{"Sign Up"}</Styled.SignUpLink> 
                </Styled.SignUpMessage>
            </Styled.SignUpMessageSpace>
        </Styled.LoginPageWrapper>
    )
}

export default LoginPage;