import { Outlet } from "react-router-dom"
import App from "./App"
import { paths } from "./lib/paths"
import { Home, Layout, News, Rent, Sold } from "./pages/public"

const routes = [
    {
        path: '/', element: <App />,
        children: [
            {
                path: '', element: <Layout />,
                children: [
                    { index: true, element: <Home /> },
                    { path: paths.public.news, element: <News /> },
                    { path: paths.public.rent, element: <Rent /> },
                    { path: paths.public.sold, element: <Sold /> },
                ]
            }
        ]
    }
]
export default routes