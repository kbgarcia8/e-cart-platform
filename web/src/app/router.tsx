import VerticalHeaderMainFooter from "shared/ui/templates/VerticalHeaderMainFooter";
import LandingHeader from "modules/marketing/LandingHeader";
import LandingFooter from "modules/marketing/LandingFooter";
import LandingMain from "modules/marketing/LandingMain";

import AuthHeader from "modules/auth/AuthHeader";
import LoginPage from "modules/auth/LoginPage";
import SignupPage from "modules/auth/SignupPage";
import AuthFooter from "modules/auth/AuthFooter";
import VerifyPage from "modules/auth/VerifyPage";


const routes = [
    {path: "/", element: <VerticalHeaderMainFooter header={<LandingHeader/>} main={<LandingMain/>} footer={<LandingFooter/>}/>},
    {path: "/signup", element: <VerticalHeaderMainFooter header={<AuthHeader/>} main={<SignupPage/>} footer={<AuthFooter/>}/>},
    {path: "/login", element: <VerticalHeaderMainFooter header={<AuthHeader/>} main={<LoginPage/>} footer={<AuthFooter/>}/>},
    {path: "/verify", element: <VerticalHeaderMainFooter header={<AuthHeader/>} main={<VerifyPage/>} footer={<AuthFooter/>}/>}
]

export default routes;