import React from "react";
import * as Styled from "./TesterLayout.styles";
import type { AllNodeProps } from "type/propTypes";
import { Outlet } from "react-router-dom";

const TesterLayout = ({
    sidebar,
    header,
    footer
}:AllNodeProps<React.ReactNode>) => {
    return(
        <Styled.TesterLayoutWrapper>
            <Styled.Sidebar>{sidebar}</Styled.Sidebar>
            <Styled.Header>{header}</Styled.Header>
            <Styled.Main>
                <Outlet />
            </Styled.Main>
            <Styled.Footer>{footer}</Styled.Footer>
        </Styled.TesterLayoutWrapper>
    )
};

export default TesterLayout;