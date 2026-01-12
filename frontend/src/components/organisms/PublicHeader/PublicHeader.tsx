import React from "react";
import headerLogo from 'assets/mock-logo.svg'
import { useNavigate } from 'react-router-dom';
import * as Styled from "./PublicHeader.styles";
import Button from "components/atoms/Button";
import Navbar from "components/molecules/Navbar";


const links = [
    {name: "Features", path: "/#features"},
    {name: "Products", path: "/#products"},
    {name: "Testimonials", path: "/#testimonials"},
    {name: "FAQs", path: "/#faqs"},
    {name: "Contact Us", path: "/#contact"}
];

const PublicHeader = ():React.ReactNode => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);

    /*
    const handleClick = () => {
        setIsSignedIn(false);
    }
    */

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
            <Styled.NavbarWrapper>
                <Navbar textColor={"teritiary"} textSize={"small"} className={"public-header-navbar"} isSigning={isSignedIn} isHashLinks={true} links={links}/>
                <Styled.ButtonWrapper>
                    <Button text={"Sign Up"} onClick={handleButtonNavigate} color={"secondary"} radius={"roundedsquare"}/>
                    <Button text={"Login"} onClick={handleButtonNavigate} radius={"roundedsquare"}/>
                </Styled.ButtonWrapper>
            </Styled.NavbarWrapper>
        </Styled.MainHeaderWrapper>
    )
}

export default PublicHeader;