import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PiPaintBucketFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import Button from "shared/ui/atoms/Button";


import { useLogout } from "modules/auth/auth.hooks";

import * as Styled from "./UserSettings.styles";
import type { ApiResponse, AuthUserDTO } from "shared/type/shared.types";
import useTheme from "shared/hooks/useTheme";



const UserSettings = () => {
    const navigate = useNavigate();
    const { currentTheme, toggleTheme } = useTheme();
    const {logoutLoading} = useLogout();
    const [user, setUser] = useState<AuthUserDTO | null>(null);
    
    const handlePaymentMethodClick = () => {
        navigate('/user/profile/settings/payment-methods');
    }


    return (
        <Styled.UserSettingsWrapper>
            <Styled.UserSettingsHeader>{'User Settings/Preferences'}</Styled.UserSettingsHeader>
            <Styled.ThemeToggleContainer>
                <Styled.ThemeToggleIconContainer>
                    <PiPaintBucketFill size={'2rem'}/>
                </Styled.ThemeToggleIconContainer>
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
            <Styled.PaymentMethodsContainer>
                <Styled.PaymentMethodsIconContainer>
                    <MdPayments size={'2rem'}/>
                </Styled.PaymentMethodsIconContainer>
                <Styled.PaymentMethodsText>{'Payment Methods'}</Styled.PaymentMethodsText>
                <Styled.RightArrowContainer>
                    <Button buttonType="button" startIcon={<FaArrowUpRightFromSquare size={'2rem'}/>} onClick={handlePaymentMethodClick}></Button>
                </Styled.RightArrowContainer>
            </Styled.PaymentMethodsContainer>
        </Styled.UserSettingsWrapper>
    );
};

export default UserSettings;