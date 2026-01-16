import VerticalHeaderMainFooter from "shared/ui/templates/VerticalHeaderMainFooter";
import LandingHeader from "modules/marketing/LandingHeader";
import LandingFooter from "modules/marketing/LandingFooter";
import LandingMain from "modules/marketing/LandingMain";
import LoginPage from "modules/authentication/LoginPage";


const routes = [
    {path: "/", element: <VerticalHeaderMainFooter header={<LandingHeader/>} main={<LandingMain/>} footer={<LandingFooter/>}/>},
    {path: "/login", element: <LoginPage/>}
]

export default routes;