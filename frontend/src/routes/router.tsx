/* Layout */
//import TesterLayout from 'components/layout/TesterLayout'
import PublicMainLayout from "components/layout/PublicMainLayout";
import PublicHeader from "components/organisms/PublicHeader";
import Footer from "components/organisms/Footer";
import LandingPage from "components/pages/LandingPage";

const routes = [
    {
        path: "/",
        element: <PublicMainLayout header={<PublicHeader/>} footer={<Footer/>}/>,
        children: [
            {index: true, element: <LandingPage/>}
        ]
    }
]

export default routes;