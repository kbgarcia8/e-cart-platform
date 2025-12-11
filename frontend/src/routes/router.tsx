/* Layout */
import TesterLayout from 'components/layout/TesterLayout'

const routes = [
    {
        path: "/",
        element: <TesterLayout/>,
        children: [
            {index: true, element: <div>Temporary Dashboard</div>}
        ]
    }
]

export default routes;