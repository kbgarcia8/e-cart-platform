import React from "react";
import useTheme from "hooks/useTheme";
import * as Styled from "./NotificationCard.styles.js";
import errorIcon from 'assets/error.png'
import warningIcon from 'assets/warning.png'
import successIcon from 'assets/success2.png'
import infoIcon from 'assets/info.svg'
import type { NotificationCardProps } from "type/propTypes";

const NotificationCard = ({
    notificationImage,
    notificationMessage,
    notificationType,
    onClickNotificationClose,
    hasCloseButton,
    closeButtonText,
    className
}:NotificationCardProps) => {

    const { currentTheme } = useTheme();

    let defaultImage;
    let backgroundColor;
    let textColor;

    switch (notificationType) {
        case 'error':
            defaultImage = errorIcon;
            backgroundColor = currentTheme.notificationPalette.errorBackground;
            textColor = currentTheme.notificationPalette.errorText;
            break;
        case 'warning':
            defaultImage = warningIcon
            backgroundColor = currentTheme.notificationPalette.warningBackground;
            textColor = currentTheme.notificationPalette.warningText;
            break;
            case 'success':
                defaultImage = successIcon
                backgroundColor = currentTheme.notificationPalette.successBackground;
                textColor = currentTheme.notificationPalette.successText;
                break;
        default:
            defaultImage = infoIcon
            backgroundColor = currentTheme.notificationPalette.infoBackground;
            textColor = currentTheme.notificationPalette.infoText;
    }

    return (
        <Styled.NotificationCardWrapper className={className} $borderColor={textColor} $backgroundColor={backgroundColor}>
            <Styled.NotificationImage src={notificationImage ? notificationImage : defaultImage} alt={`${className}-image`} />
            <Styled.NotifcationMessage $textColor={textColor}>{notificationMessage}</Styled.NotifcationMessage>
            {hasCloseButton && 
            <Styled.NotificationCloseButton 
                onClick={onClickNotificationClose}
                id={`${className}-close-button`}
                text={closeButtonText}
                $textColor={textColor}
                buttonType={'button'}
            />}
        </Styled.NotificationCardWrapper>
    );
}

export default NotificationCard;