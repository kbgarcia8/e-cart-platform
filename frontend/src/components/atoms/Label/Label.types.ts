export interface LabelProps {
    htmlFor?: string;
    textLabel?: string | undefined;
    additionalInfo?: string | undefined;
    $labelFlexDirection?: React.CSSProperties['flexDirection'];
    source?: string;
    svg?: React.ReactNode;
    className?: string;
}