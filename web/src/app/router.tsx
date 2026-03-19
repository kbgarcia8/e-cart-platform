import VerticalHeaderMainFooter from "shared/ui/templates/VerticalHeaderMainFooter";
import LandingHeader from "modules/marketing/LandingHeader";
import LandingFooter from "modules/marketing/LandingFooter";
import LandingMain from "modules/marketing/LandingMain";

import AuthHeader from "modules/auth/AuthHeader";
import LoginPage from "modules/auth/LoginPage";
import SignupPage from "modules/auth/SignupPage";
import AuthFooter from "modules/auth/AuthFooter";
import VerifyPage from "modules/auth/VerifyPage";

import UserDashboard from "modules/user/UserDashboard";
import UserHeader from "modules/user/UserHeader/UserHeader";
import UserFooter from "modules/user/UserFooter/UserFooter";

const routes = [
    {path: "/", element: <VerticalHeaderMainFooter headerHeight={"12svh"} header={<LandingHeader/>} main={<LandingMain/>} footer={<LandingFooter/>}/>},
    {path: "/auth/signup", element: <VerticalHeaderMainFooter headerHeight={"7.5svh"} header={<AuthHeader/>} main={<SignupPage/>} footer={<AuthFooter/>}/>},
    {path: "/auth/login", element: <VerticalHeaderMainFooter headerHeight={"7.5svh"} header={<AuthHeader/>} main={<LoginPage/>} footer={<AuthFooter/>}/>},
    {path: "/auth/verify", element: <VerticalHeaderMainFooter header={<AuthHeader/>} main={<VerifyPage/>} footer={<AuthFooter/>}/>},
    {path: "/user/dashboard", element: <VerticalHeaderMainFooter header={<UserHeader/>} main={<UserDashboard/>} footer={<UserFooter/>}/>}
]

export default routes;