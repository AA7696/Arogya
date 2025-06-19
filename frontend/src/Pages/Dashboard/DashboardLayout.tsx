import DashboardNavbar from "./DashboardNavbar"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { useSideBarToggleStore } from "@/store/sideBarToggleStore"
function DashboardLayout() {

  const {isOpen} = useSideBarToggleStore()
  
  return (
   <>
 <div className=' w-screen h-screen flex flex-row'>
    <Sidebar />
    <div className={` transition-all duration-300 ease-in-out ${isOpen? "ml-60": "ml-0"} flex-1 flex-col `}>
    <DashboardNavbar />
    <div className=" flex-1 overflow-y-auto p-2">
      <Outlet />
    </div>
    
    </div>

    </div> 

   </>
  )
}

export default DashboardLayout