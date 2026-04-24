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


    return (
        <Styled.UserSettingsWrapper>
            <Styled.ThemeToggleContainer>
                <Styled.ThemeToggleText>{currentTheme.name == 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}</Styled.ThemeToggleText>
                <Styled.ThemeToggleButtonContainer>
                    <Styled.ToggleSwitchWrapper className="switch">
                        <Styled.ToggleSwitchInput type="checkbox" onClick={() => (toggleTheme())}></Styled.ToggleSwitchInput>
                        <Styled.ToggleSwitchSlider className="slider-round">
                            {currentTheme.name !== 'light' ? <FaSun size={'1.75rem'}/> : <FaMoon size={'1.75rem'}/>}
                        </Styled.ToggleSwitchSlider>
                    </Styled.ToggleSwitchWrapper>
                </Styled.ThemeToggleButtonContainer>
            </Styled.ThemeToggleContainer>
        </Styled.UserSettingsWrapper>
    );
};

export default UserSettings;