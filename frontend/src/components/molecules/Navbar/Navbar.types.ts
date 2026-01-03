import type { Theme } from "type/generalTypes";

export type NavbarProps = {
    $anchorTheme?: Theme;
    isSigning: boolean;
    isHashLinks?: boolean;
    links: Array<{
        name: string;
        path: string;
    }>;
    className?: string;
}