
import { Home, Activity, Calendar, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, href: '/dashboard' },
    { name: 'Activity', icon: <Activity className="w-5 h-5" />, href: '/dashboard/activity' },
    { name: 'Appointments', icon: <Calendar className="w-5 h-5" />, href: '/dashboard/appointments' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/dashboard/settings' },
]

export default function Sidebar() {
    return (
        <aside className="w-60 h-screen border-r border-gray-200 p-6 flex flex-col justify-between">
            {/* Top Section */}
            <div  className=' flex flex-col gap-10'>
                <div className=" flex flex-row items-center gap-1.5">
                    <Activity size={34} color='#1FBCF9' className=' font-bold' />
                    <h3 className=" text-2xl md:text-3xl font-semibold text-white">Arogya</h3>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-[#1FBCF9]/15 transition"
                        >
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <div>
                <Button variant="ghost" className="w-full flex justify-start gap-3 text-red-500 hover:bg-red-400">
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
