import React, { type PropsWithChildren } from "react";
import * as Styled from './Section.styles.js';
import type { SectionProps } from "type/propTypes";

const Section = ({className, title, description, children}:PropsWithChildren<SectionProps>) => {
    return(
        <Styled.SectionWrapper className={className}>
            {title && <Styled.SectionTitle>{title}</Styled.SectionTitle>}
            {description && <Styled.SectionDescription>{description}</Styled.SectionDescription>}
            {children}
        </Styled.SectionWrapper>
    )
}

export default Section;