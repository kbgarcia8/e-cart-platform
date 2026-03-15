import type { ColorString } from "shared/type/generalTypes";
import { TEXTCOLORS, TEXTSIZES } from './Navbar.styles';

export type NavbarProps = {
    textColor?: keyof typeof TEXTCOLORS;
    textSize?: keyof typeof TEXTSIZES;
    $anchorTheme?: Record<string, ColorString>;
    isVisible?: boolean;
    isHashLinks?: boolean;
    links: Array<{
        name?: string;
        path: string;
        icon?: React.ReactNode;
    }>;
    className?: string;
}