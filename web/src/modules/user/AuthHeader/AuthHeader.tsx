import * as Styled from "./AuthHeader.styles";
import { IoIosArrowBack } from "react-icons/io";

const AuthHeader = () => {
    return(
        <Styled.AuthHeaderWrapper>
            <Styled.BackToHomePageWrapper to={"/"}>
                <Styled.BackIconContainer>
                    <IoIosArrowBack/>
                </Styled.BackIconContainer>
                <Styled.BackToHomeText>{"Back to Landing Page"}</Styled.BackToHomeText>
            </Styled.BackToHomePageWrapper>
        </Styled.AuthHeaderWrapper>
    )
}

export default AuthHeader;