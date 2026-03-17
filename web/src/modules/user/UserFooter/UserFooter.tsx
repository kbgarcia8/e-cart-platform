import * as Styled from "./UserFooter.styles";
import Navbar from "shared/ui/molecules/Navbar";
import { RiAccountCircleFill, RiHome5Fill, RiPriceTag3Fill, RiShoppingCartFill  } from "react-icons/ri";

const UserFooter =() => {

    const links = [
        {name: "Home", path: `${import.meta.env.VITE_DEV_API_URL}/user/dashboard`, icon: <RiHome5Fill size={'2.5rem'}/>},
        {name: "Promos", path: `${import.meta.env.VITE_DEV_API_URL}/user/promos`, icon: <RiPriceTag3Fill  size={'2.5rem'}/>},
        {name: "Cart", path: `${import.meta.env.VITE_DEV_API_URL}/user/cart`, icon: <RiShoppingCartFill  size={'2.5rem'}/>},
        {name: "Accounts", path: `${import.meta.env.VITE_DEV_API_URL}/user/profile`, icon: <RiAccountCircleFill size={'2.5rem'}/>},
    ];
    
    return(
        <Styled.UserFooterWrapper>
            <Navbar links={links} textColor={"teritiary"} />
        </Styled.UserFooterWrapper>
    )
}

export default UserFooter;