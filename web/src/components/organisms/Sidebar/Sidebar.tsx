import {React, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/UserAuthContext";
import sidebarLogo from '../../../assets/pic-only-logo.png'
import HomeIcon from "components/svgs/HomeIcon.tsx";
import MenuIcon from "components/svgs/MenuIcon.tsx";
import CartIcon from "components/svgs/CartIcon.tsx";
import ClipboardIcon from "components/svgs/ClipboardIcon.tsx";
import TimerIcon from "components/svgs/TimerIcon.tsx";
import SettingsIcon from "components/svgs/SettingsIcon.tsx";
import LogoutIcon from "components/svgs/LogoutIcon.tsx";
import * as styled from "./Sidebar.styles";

const Sidebar =({}) => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const handleLogoClick:React.MouseEventHandler<HTMLButtonElement> = () => {
        navigate('/');
    }

    const mainControls = [
        {name: "Home", path:"", icon: <HomeIcon/>},
        {name: "Menu", path:"/menu", icon: <MenuIcon/>},
        {name: "Cart", path:"/cart", icon: <CartIcon/>},
        {name: "Pending", path:"/pending", icon: <TimerIcon/>},
        {name: "Orders", path:"/orders", icon: <ClipboardIcon/>},        
    ]

    const settingControls = [
        {name: "Settings", path:"/settings", icon: <SettingsIcon/>},
        {name: "Logout", path:"/login", icon: <LogoutIcon/>}
    ]
    
    return(
        <styled.SidebarWrapper>
            <styled.SidebarLogoSpace>
                <styled.SidebarLogo src={sidebarLogo} onClick={handleLogoClick}/>
            </styled.SidebarLogoSpace>
            <styled.SidebarMainControlsSpace>                
                {mainControls.map((mainControl,index) => (
                    <styled.StyledLinkWithImage
                        key={`${mainControl.name}-${index}`}
                        to={`../dashboard${mainControl.path}`}                        
                    >
                        {mainControl.icon}
                    </styled.StyledLinkWithImage>
                ))}
            </styled.SidebarMainControlsSpace>
            <styled.SidebarSettingsSpace>
                {settingControls.map((settingControl,index) => (
                    <styled.StyledLinkWithImage 
                        key={`${settingControl.name}-${index}`}
                        to={settingControl.name=="Settings" ? `../dashboard${settingControl.path}` : `${settingControl.path}`}
                        onClick={settingControl.name=="Logout" && logOut}
                    >
                        {settingControl.icon}
                    </styled.StyledLinkWithImage>
                ))}
            </styled.SidebarSettingsSpace>
        </styled.SidebarWrapper>
    )
}

export default Sidebar;