import React, { type PropsWithChildren } from "react";
import * as Styled from './Section.styles.js';

type SectionProps = {
    title?: string;
    description?: string;
    className?: string;
    id: string;
}

const Section = ({className, id, title, description, children}:PropsWithChildren<SectionProps>) => {
    return(
        <Styled.SectionWrapper className={className} id={id}>
            {title && <Styled.SectionTitle>{title}</Styled.SectionTitle>}
            {description && <Styled.SectionDescription>{description}</Styled.SectionDescription>}
            {children}
        </Styled.SectionWrapper>
    )
}

export default Section;