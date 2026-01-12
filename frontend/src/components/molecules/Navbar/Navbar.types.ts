import type { Theme } from "type/generalTypes";
import { TEXTCOLORS, TEXTSIZES } from './Navbar.styles'

export type NavbarProps = {
    textColor?: keyof typeof TEXTCOLORS;
    textSize?: keyof typeof TEXTSIZES;
    $anchorTheme?: Theme;
    isSigning: boolean;
    isHashLinks?: boolean;
    links: Array<{
        name: string;
        path: string;
    }>;
    className?: string;
}