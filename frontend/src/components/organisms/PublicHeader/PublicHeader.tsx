import React from "react";
import headerLogo from 'assets/mock-logo.svg'
import { useNavigate } from 'react-router-dom';
import Navbar from "components/molecules/Navbar";
import * as styled from "./PublicHeader.styles.js";

const links = [
    {name: "Home", path: "/about"},
    {name: "About Us", path: "/about"},
    {name: "Testimonials", path: "/testimonials"}
]

const PublicHeader =() => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);

    const handleLogoClick = () => {
        navigate('/');
        setIsSignedIn(false)
    }

    const handleButtonNavigate = (e:React.MouseEvent<HTMLButtonElement>) => { 
        const textToLink:Record<string, string> = {
            "Sign Up": "signup",
            "Login": "login",
            //"Dashboard": "dashboard" //tempoarary logged in
        }       
        const buttonText = e.currentTarget.textContent
        navigate(`/${textToLink[buttonText]}`)
        setIsSignedIn(true)
    }
    
    return(
        <styled.MainHeaderWrapper>
            <styled.MainHeaderLogoSpace>
                <styled.MainHeaderLogo onClick={handleLogoClick} src={headerLogo} />
            </styled.MainHeaderLogoSpace>
                <Navbar isSigning={isSignedIn} links={links}/>
            <styled.ButtonWrapper>
                <styled.SignUpButton buttonType={'button'} text={"Sign Up"} onClick={handleButtonNavigate}/>
                <styled.LoginButton buttonType={'button'} text={"Login"} onClick={handleButtonNavigate}/>
            </styled.ButtonWrapper>
        </styled.MainHeaderWrapper>
    )
}

export default PublicHeader;