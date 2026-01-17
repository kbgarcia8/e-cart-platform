import VerticalHeaderMainFooter from "shared/ui/templates/VerticalHeaderMainFooter";
import LandingHeader from "modules/marketing/LandingHeader";
import LandingFooter from "modules/marketing/LandingFooter";
import LandingMain from "modules/marketing/LandingMain";

import AuthHeader from "modules/authentication/AuthHeader";
import LoginPage from "modules/authentication/LoginPage";
import AuthFooter from "modules/authentication/AuthFooter";


const routes = [
    {path: "/", element: <VerticalHeaderMainFooter header={<LandingHeader/>} main={<LandingMain/>} footer={<LandingFooter/>}/>},
    {path: "/login", element: <VerticalHeaderMainFooter header={<AuthHeader/>} main={<LoginPage/>} footer={<AuthFooter/>}/>},
]

export default routes;