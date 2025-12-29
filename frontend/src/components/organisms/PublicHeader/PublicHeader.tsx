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

    const handleClick = () => {
        setIsSignedIn(false);
    }

    const handleButtonNavigate = (e:React.MouseEvent<HTMLButtonElement>) => { 
        const textToLink:Record<string, string> = {
            "Sign Up": "signup",
            "Login": "login",
        }       
        const buttonText = e.currentTarget.textContent
        navigate(`/${textToLink[buttonText]}`)
    }
    
    return(
        <Styled.MainHeaderWrapper>
            <Styled.MainHeaderLogoSpace smooth to="#landing">
                <Styled.MainHeaderLogo src={headerLogo} />
            </Styled.MainHeaderLogoSpace>
                <Styled.PublicNavbar className={"public-navbar"} isSigning={isSignedIn} isHashLinks={true} links={links}/>
            <Styled.ButtonWrapper>
                <Styled.SignUpButton buttonType={'button'} text={"Sign Up"} onClick={handleButtonNavigate}/>
                <Styled.LoginButton buttonType={'button'} text={"Login"} onClick={handleButtonNavigate}/>
            </Styled.ButtonWrapper>
        </Styled.MainHeaderWrapper>
    )
}

export default PublicHeader;