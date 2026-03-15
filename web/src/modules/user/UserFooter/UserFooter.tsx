import * as Styled from "./UserFooter.styles";
import Navbar from "shared/ui/molecules/Navbar";
import { RiAccountCircleFill } from "react-icons/ri";

const UserFooter =() => {

    const links = [
        {name: "Features", path: "/#features"},
        {name: "Products", path: "/#products"},
        {name: "Testimonials", path: "/#testimonials"},
        {name: "FAQs", path: "/#faqs"},
        {name: "Accounts", path: `${import.meta.env.VITE_DEV_API_URL}/user/profile`, icon: <RiAccountCircleFill size={'3rem'}/>},
    ];
    
    return(
        <Styled.UserFooterWrapper>
            <Navbar links={links} textColor={"teritiary"} />
        </Styled.UserFooterWrapper>
    )
}

export default UserFooter;