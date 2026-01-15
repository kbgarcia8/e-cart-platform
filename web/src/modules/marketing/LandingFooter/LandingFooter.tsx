import * as Styled from "./LandingFooter.styles";
import Navbar from "shared/ui/molecules/Navbar";

const links = [
    {name: "Home", path: "/#landing"},
    {name: "Features", path: "/#features"},
    {name: "Products", path: "/#products"},
    {name: "Testimonials", path: "/#testimonials"},
    {name: "FAQs", path: "/#faqs"},
    {name: "Contact Us", path: "/#contact"}
];

const LandingFooter =() => {
    
    return(
        <Styled.LandingFooterWrapper>
            <Styled.NavbarWrapper>
                <Navbar textColor={"teritiary"} textSize={"small"} className={"public-header-navbar"} isSigning={false} isHashLinks={true} links={links}/>
            </Styled.NavbarWrapper>
            <Styled.LandingFooterMessage>
                © Copyright 2025 Customer_Name. All Rights Reserved. Website designed and created by Customer_Name Team.
            </Styled.LandingFooterMessage>
        </Styled.LandingFooterWrapper>
    )
}

export default LandingFooter;