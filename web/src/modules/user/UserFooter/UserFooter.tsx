import * as Styled from "./UserFooter.styles";
import Navbar from "shared/ui/molecules/Navbar";
import useMediaQuery from "shared/hooks/useMediaQuery";
import { RiAccountCircleFill, RiHome5Fill, RiPriceTag3Fill, RiShoppingCartFill  } from "react-icons/ri";

const UserFooter =() => {
    const { currentBreakpoints } = useMediaQuery();

    const links = [
        {name: "Home", path: `/user/dashboard`, icon: <RiHome5Fill size={'2.5rem'}/>},
        {name: "Promos", path: `/user/promos`, icon: <RiPriceTag3Fill  size={'2.5rem'}/>},
        {name: "Cart", path: `/user/cart`, icon: <RiShoppingCartFill  size={'2.5rem'}/>},
        {name: "Accounts", path: `/user/profile`, icon: <RiAccountCircleFill size={'2.5rem'}/>},
    ];
    
    return(
        <>
        {currentBreakpoints.isMobile && 
            <Styled.UserFooterWrapper>
                <Navbar links={links} textColor={"teritiary"} />
            </Styled.UserFooterWrapper>
        }
        </>
    )
}

export default UserFooter;