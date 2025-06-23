
import { Home, Activity, Calendar, UserRoundPen, ChartNoAxesCombined, Hospital, Bot, HeartPulse } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useSideBarToggleStore } from '@/store/sideBarToggleStore'

const navItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/dashboard/dashboard-home' },
    { name: 'Analytics', icon: <ChartNoAxesCombined className=' w-5 h-5' />, href: '/dashboard/analytics' },
    { name: 'Daily Task', icon: <Calendar className="w-5 h-5" />, href: '/dashboard/daily-task' },
    { name: 'Appointment', icon: <Hospital className=' w-5 h-5' />, href: '/dashboard/appointment' },
    { name: 'AI Chat', icon: <Bot className=' w-5 h-5' />, href: '/dashboard/aichat' },
    { name: 'AI Report', icon: <HeartPulse className=' w-5 h-5' />, href: '/dashboard/aireport' },
    { name: 'Profile', icon: <UserRoundPen className=' w-5 h-5' />, href: '/dashboard/profile' },
]

export default function Sidebar() {
    const { isOpen } = useSideBarToggleStore()
    return (
        <aside className={` transition-all duration-300 ease-in-out ${isOpen ? "flex" : " hidden"} w-60  h-screen border-r border-gray-200 p-6 flex-col justify-between fixed z-10`}>
            {/* Top Section */}
            <div className=' flex flex-col gap-10'>
                <div className=" flex flex-row items-center gap-1.5">
                    <Activity size={34} color='#1FBCF9' className=' font-bold' />
                    <NavLink to='/' className=" text-2xl md:text-3xl font-semibold text-white">Arogya</NavLink>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-[#1FBCF9]/15 transition"

                        >
                            {item.icon} {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

        </aside>
    )
}
