import React from "react";
import headerLogo from 'shared/assets/mock-logo.svg'
import { useNavigate } from 'react-router-dom';
import * as Styled from "./LandingHeader.styles";
import Button from "shared/ui/atoms/Button";
import Navbar from "shared/ui/molecules/Navbar";


const links = [
    {name: "Home", path: "/#landing"},
    {name: "Features", path: "/#features"},
    {name: "Products", path: "/#products"},
    {name: "Testimonials", path: "/#testimonials"},
    {name: "FAQs", path: "/#faqs"},
    {name: "Contact Us", path: "/#contact"}
];

const LandingHeader = ():React.ReactNode => {
    const navigate = useNavigate();

    const handleButtonNavigate = (e:React.MouseEvent<HTMLButtonElement>) => { 
        const textToLink:Record<string, string> = {
            "Sign Up": "signup",
            "Login": "login",
        }       
        const buttonText = e.currentTarget.textContent
        navigate(`/auth/${textToLink[buttonText]}`)
    }
    
    return(
        <Styled.LandingHeaderWrapper>
            <Styled.LandingHeaderLogoSpace smooth to="#landing">
                <Styled.LandingHeaderLogo src={headerLogo} />
            </Styled.LandingHeaderLogoSpace> 
            <Styled.NavbarWrapper>
                <Navbar textColor={"teritiary"} textSize={"smaller"} className={"public-header-navbar"} isHashLinks={true} links={links}/>
                <Styled.ButtonWrapper>
                    <Button buttonType={"button"} text={"Sign Up"} onClick={handleButtonNavigate} color={"secondary"} radius={"roundedsquare"}/>
                    <Button buttonType={"button"} text={"Login"} onClick={handleButtonNavigate} radius={"roundedsquare"}/>
                </Styled.ButtonWrapper>
            </Styled.NavbarWrapper>
        </Styled.LandingHeaderWrapper>
    )
}

export default LandingHeader;