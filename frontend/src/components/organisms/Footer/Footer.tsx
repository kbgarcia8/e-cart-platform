import * as Styled from "./Footer.styles";
import Navbar from "components/molecules/Navbar";

const links = [
    {name: "Home", path: "/#landing"},
    {name: "Features", path: "/#features"},
    {name: "Products", path: "/#products"},
    {name: "Testimonials", path: "/#testimonials"},
    {name: "FAQs", path: "/#faqs"},
    {name: "Contact Us", path: "/#contact"}
];

const Footer =() => {
    
    return(
        <Styled.FooterWrapper>
            <Styled.NavbarWrapper>
                <Navbar textColor={"teritiary"} className={"public-header-navbar"} isSigning={false} isHashLinks={true} links={links}/>
            </Styled.NavbarWrapper>
            <Styled.FooterMessage>
                © Copyright 2025 Customer_Name. All Rights Reserved. Website designed and created by Customer_Name Team.
            </Styled.FooterMessage>
        </Styled.FooterWrapper>
    )
}

export default Footer;