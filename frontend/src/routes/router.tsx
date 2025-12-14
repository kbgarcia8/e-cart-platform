/* Layout */
//import TesterLayout from 'components/layout/TesterLayout'
import PublicMainLayout from "components/layout/PublicMainLayout";

const routes = [
    {
        path: "/",
        element: <PublicMainLayout/>,
        children: [
            {index: true, element: <div>Temporary Dashboard</div>}
        ]
    }
]

export default routes;