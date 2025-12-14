import React from "react";
import * as Styled from "./PublicMainLayout.styles";
import type { AllNodeProps } from "type/propTypes";
import { Outlet } from "react-router-dom";

const PublicMainLayout = ({
    header,
    footer
}:AllNodeProps<React.ReactNode>) => {
    return(
        <Styled.TesterLayoutWrapper>
            <Styled.Header>{header}</Styled.Header>
            <Styled.Main>
                <Outlet />
            </Styled.Main>
            <Styled.Footer>{footer}</Styled.Footer>
        </Styled.TesterLayoutWrapper>
    )
};

export default PublicMainLayout;