
import { Header } from "@/components/public"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (<>
        <Header />
        <Outlet />
    </>)
}
export default Layout