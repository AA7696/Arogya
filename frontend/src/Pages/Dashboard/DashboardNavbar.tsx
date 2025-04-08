
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function DashboardNavbar() {
  return (
    <header className="w-full  shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left: Branding or Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="">
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-[#1FBCF9]">Hi! User</h2>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/profile.jpg" alt="User" />
          <AvatarFallback className=' text-black'>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
