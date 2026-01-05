import React, { type PropsWithChildren } from "react";
import * as Styled from './Section.styles';
import type { SectionProps } from "./Section.types";

const Section = ({className, id, title, description, $titleBottomMargin, $titleSize, $titleColor, $descriptionBottomMargin, $descriptionSize, $descriptionColor, children}:PropsWithChildren<SectionProps>) => {
    return(
        <Styled.SectionWrapper className={className} id={id}>
            {title && <Styled.SectionTitle $titleSize={$titleSize} $titleColor={$titleColor} $titleBottomMargin={$titleBottomMargin}>{title}</Styled.SectionTitle>}
            {description && <Styled.SectionDescription $descriptionSize={$descriptionSize} $descriptionColor={$descriptionColor} $descriptionBottomMargin={$descriptionBottomMargin}>{description}</Styled.SectionDescription>}
            {children}
        </Styled.SectionWrapper>
    )
}

export default Section;