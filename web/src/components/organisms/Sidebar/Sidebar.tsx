import {React, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/UserAuthContext";
import sidebarLogo from '../../../assets/pic-only-logo.png'
import HomeIcon from "shared/ui/svgs/HomeIcon";
import MenuIcon from "shared/ui/svgs/MenuIcon";
import CartIcon from "shared/ui/svgs/CartIcon";
import ClipboardIcon from "shared/ui/svgs/ClipboardIcon";
import TimerIcon from "shared/ui/svgs/TimerIcon";
import SettingsIcon from "shared/ui/svgs/SettingsIcon";
import LogoutIcon from "shared/ui/svgs/LogoutIcon";
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