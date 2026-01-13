import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { useAuth } from "../../../../context/UserAuthContext.jsx";
import type { FieldsetShape, inputEntryShape, LabeledCheckboxOrRadio, LabeledTextLike } from '@kbgarcia8/react-dynamic-form';
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

const LoginPage =({}) => {
    let navigate = useNavigate();
    const initialized = React.useRef(false)

    const [loginFromValues, setLoginFromValues] = React.useState<inputEntryShape<false,LabeledTextLike>[] | null>(null)

    const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    const handleFormSubmit = () => {
        console.log('form submitted')
    };

    const loginFormInputs = loginFormInputArray.map((input) => (
        {...input,
            onChange: handleLoginFormChange,
            dataAttributes: {
                "data-key": `${input.name}`
            }
        }
    ))

    React.useEffect(() =>{
        if(!initialized.current) {
            setLoginFromValues(loginFormInputs)
            initialized.current = true
        }
    },[])
    

    return(
        <Styled.LoginPageWrapper>
            <Styled.LoginPageHeader>
                Welcome to Kain at Kape Website! Login your account to continue.
            </Styled.LoginPageHeader>
            <Styled.FormSpace>
                <Styled.LoginForm
                    className={'without-fieldsets'}
                    fieldsets={null}
                    formInputs={loginFromValues || []}
                    id="login"
                    isExpandable={false}
                    inputClass={'login-form-input'}
                    labelClass={'login-form-label'}
                    labelAndInputContainerClass={'login-form-label-n-input-container'}
                    hasSubmit
                    submitText={'Login'}
                    handleSubmitForm={handleFormSubmit}
                />
            </Styled.FormSpace>
            <Styled.SignUpMessageSpace>
                <Styled.SignUpMessage>
                    Don't have an account yet? <Styled.SignUpLink  to={`../signup`}>{"Sign Up"}</Styled.SignUpLink> 
                </Styled.SignUpMessage>
            </Styled.SignUpMessageSpace>
        </Styled.LoginPageWrapper>
    )
}

export default LoginPage;