/* Layout */
//import TesterLayout from 'components/layout/TesterLayout'
import PublicMainLayout from "components/layout/PublicMainLayout";
import PublicHeader from "components/organisms/PublicHeader";

const routes = [
    {
        path: "/",
        element: <PublicMainLayout header={<PublicHeader/>}/>,
        children: [
            {index: true, element: <div>Temporary Dashboard</div>}
        ]
    }
]

export default routes;