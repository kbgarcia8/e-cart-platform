import type { Theme } from "type/generalTypes";
import { TEXTCOLORS } from './Navbar.styles'

export type NavbarProps = {
    textColor?: keyof typeof TEXTCOLORS;
    $anchorTheme?: Theme;
    isSigning: boolean;
    isHashLinks?: boolean;
    links: Array<{
        name: string;
        path: string;
    }>;
    className?: string;
}