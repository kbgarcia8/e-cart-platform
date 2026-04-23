import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "shared/ui/atoms/Button";


import { useLogout } from "modules/auth/auth.hooks";

import * as Styled from "./UserSettings.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";
import useTheme from "shared/hooks/useTheme";



const UserSettings = () => {
    const isLoggedIn = useRef(false);
    const navigate = useNavigate();
    const { currentTheme, toggleTheme } = useTheme();
    const {logoutLoading} = useLogout();
    const [user, setUser] = useState<AuthUserDTO | null>(null);

    console.log(currentTheme.name)


    return (
        <Styled.UserSettingsWrapper>
            <Styled.ThemeToggleContainer>
                <Styled.ThemeToggleText>{currentTheme.name == 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}</Styled.ThemeToggleText>
                <Styled.ThemeToggleButtonContainer>
                    <Button radius={"circle"} onClick={() => (toggleTheme())} buttonType={"button"} startIcon={currentTheme.name !== 'light' ? <FaSun size={'2rem'}/> : <FaMoon size={'2rem'}/>}/>
                </Styled.ThemeToggleButtonContainer>
            </Styled.ThemeToggleContainer>
        </Styled.UserSettingsWrapper>
    );
};

export default UserSettings;