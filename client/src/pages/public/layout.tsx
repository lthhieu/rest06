import { Outlet } from "react-router-dom"

const Layout = () => {
    return (<>
        <p>Layout page</p>
        <Outlet />
    </>)
}
export default Layout