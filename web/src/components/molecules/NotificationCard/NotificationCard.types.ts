export type NotificationCardProps = {
    notificationImage?: string;
    notificationMessage?: string;
    notificationType: string;
    onClickNotificationClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
    hasCloseButton: boolean;
    closeButtonText?: string;
    className?: string
}