
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
function App() {

  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}

export default App
