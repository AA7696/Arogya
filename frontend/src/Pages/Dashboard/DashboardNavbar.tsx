
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {  UserButton, useUser } from '@clerk/clerk-react'
import { useSideBarToggleStore } from '@/store/sideBarToggleStore'



export default function DashboardNavbar() {
  const { user } = useUser()
  const {toggle} = useSideBarToggleStore()
  return (
    <header className="w-full  shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left: Branding or Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <Button
        onClick={() => toggle()}
         variant="ghost" size="icon" className="">
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-[#1FBCF9]">Hi! {user?.firstName}</h2>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <UserButton 
          afterSignOutUrl='/' 
          userProfileMode='navigation' 
          userProfileUrl='/profile' 
          showName={false} 
        />

      </div>
    </header>
  )
}
