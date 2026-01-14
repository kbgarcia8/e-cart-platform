/* Layout */
//import TesterLayout from 'components/layout/TesterLayout'
//import PublicMainLayout from "components/layout/PublicMainLayout";
//import PublicHeader from "components/organisms/PublicHeader";
//import Footer from "components/organisms/Footer";
import LandingPage from "modules/marketing/LandingPage";
//import LoginPage from "components/pages/LoginPage";

const routes = [
    {
        path: "/",
        //element: <PublicMainLayout header={<PublicHeader/>} footer={<Footer/>}/>,
        children: [
            {index: true, element: <LandingPage/>},
            //{path: "/login", element: <LoginPage/>}
        ]
    }
]

export default routes;