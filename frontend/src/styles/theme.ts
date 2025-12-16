import { asColor } from "utils/utility"
import type { Theme, ColorString } from "type/generalTypes"

export const palette:Record<string,ColorString> = {
    primary1: asColor('#202234'),
    primary2: asColor('#3C5E83'),
    primary3: asColor('#0F60B6'),
    secondary1: asColor('#C67E10'),
    secondary2: asColor('#F6C46D'),
    neutral1: asColor('#FFFFFF'),
    neutral2: asColor('#F2F2F2'),
    neutral3: asColor('#ABABAB'),
    neutral4: asColor('#373A40'),
    neutral5: asColor('#000000'),
    accent: asColor('#E1D3B7'),
    shadow1: asColor('rgb(88, 88, 88)'),
    shadow2: asColor('rgba(255, 255, 255, 0.50)')
}

export const lightTheme:Theme = {
    name: "light",
    colors: {
        screenColor: palette.neutral2,
        backgroundColor1: palette.primary1,
        backgroundColor2: palette.primary2,
        backgroundColor3: palette.secondary2,
        backgroundColor4: palette.secondary1,
        borderColor1: palette.neutral5,
        borderColor2: palette.neutral3,
        textColor1: palette.neutral5,
        textColor2: palette.neutral4,
        textColor3: palette.accent,
        shadow: palette.shadow1
    },
    anchorTheme: {
        link: palette.neutral5,
        visited: palette.neutral5,
        hover: palette.primary2,
        active: palette.secondary2
    },
    footerTheme: {
        backgroundColor: palette.neutral5,
        textColor: palette.secondary1,
        shadowColor: palette.shadow1
    },
    notificationPalette: {
        infoText: asColor('#C9E6F0'),
        infoBackground: asColor('#202234'),
        warningText: asColor('#FCFFC1'),
        warningBackground: asColor('#F2C265'),
        successText: asColor('#9EDF9C'),
        successBackground: asColor('#123524'),
        errorText: asColor('#FAD4D4'),
        errorBackground: asColor('#990000'),
    }
}

export const darkTheme:Theme = {
    name: "dark",
    colors: {
        screenColor: palette.neutral5,
        backgroundColor1: palette.primary2,
        backgroundColor2: palette.primary3,
        backgroundColor3: palette.secondary1,
        backgroundColor4: palette.secondary2,
        borderColor1: palette.neutral2,
        borderColor2: palette.neutral3,
        textColor1: palette.neutral1,
        textColor2: palette.accent,
        textColor3: palette.neutral2,
        shadow: palette.shadow2
    },
    anchorTheme: {
        link: palette.neutral1,
        visited: palette.neutral1,
        hover: palette.primary3,
        active: palette.secondary1
    },
    footerTheme: {
        backgroundColor: palette.accent,
        textColor: palette.primary1,
        shadowColor: palette.shadow2
    },
    notificationPalette: {
        infoText: asColor('#202234'),
        infoBackground: asColor('#C9E6F0'),
        warningText: asColor('#F2C265'),
        warningBackground: asColor('#FCFFC1'),
        successText: asColor('#123524'),
        successBackground: asColor('#9EDF9C'),
        errorBackground: asColor('#FAD4D4'),
        errorText: asColor('#990000'),
    }
}