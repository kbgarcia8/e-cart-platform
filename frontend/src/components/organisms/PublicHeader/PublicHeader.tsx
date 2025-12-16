import React from "react";
import headerLogo from 'assets/mock-logo.svg'
import { useNavigate } from 'react-router-dom';
import * as Styled from "./PublicHeader.styles.js";

const links = [
    {name: "Features", path: "/#features"},
    {name: "About Us", path: "/#about"},
    {name: "Testimonials", path: "/#testimonials"},
    {name: "Contact Us", path: "/#contact"}
]

const PublicHeader = ():React.ReactNode => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);

    const handleLogoClick = () => {
        navigate('/#landing');
        setIsSignedIn(false)
    }

    const handleButtonNavigate = (e:React.MouseEvent<HTMLButtonElement>) => { 
        const textToLink:Record<string, string> = {
            "Sign Up": "signup",
            "Login": "login",
        }       
        const buttonText = e.currentTarget.textContent
        navigate(`/${textToLink[buttonText]}`)
        //setIsSignedIn(true)
    }
    
    return(
        <Styled.MainHeaderWrapper>
            <Styled.MainHeaderLogoSpace>
                <Styled.MainHeaderLogo onClick={handleLogoClick} src={headerLogo} />
            </Styled.MainHeaderLogoSpace>
                <Styled.PublicNavbar className={"public-navbar"} isSigning={isSignedIn} links={links}/>
            <Styled.ButtonWrapper>
                <Styled.SignUpButton buttonType={'button'} text={"Sign Up"} onClick={handleButtonNavigate}/>
                <Styled.LoginButton buttonType={'button'} text={"Login"} onClick={handleButtonNavigate}/>
            </Styled.ButtonWrapper>
        </Styled.MainHeaderWrapper>
    )
}

export default PublicHeader;