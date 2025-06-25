import { Activity } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from "motion/react"
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';


const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
    { label: "FAQs", href: "#faqs" },
];


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const {data: profile} = useUserProfile()

    return (
        <>
            <section className=" flex items-center justify-center p-5 fixed w-full bg-[#0a0a0a] z-50 ">
                <div className=" container mx-auto">
                    <div className=' border-2 rounded-[27px] md:rounded-full border-white/15'>
                        <div className=" grid grid-cols-2 md:grid-cols-3 items-center p-3 px-4">
                            <div className=" flex flex-row items-center gap-1.5">
                                <Activity size={34} color='#1FBCF9' className=' font-bold' />
                                <h3 className=" text-2xl md:text-3xl font-semibold text-white">Arogya</h3>
                            </div>
                            <div className=" hidden md:flex">
                                <nav className="flex justify-center lg:justify-start gap-10 font-medium">
                                    {navLinks.map((link, index) => {
                                        return (
                                            <a key={index} href={link.href} className=" hover:text-white transition duration-300">{link.label}</a>
                                        )

                                    })}
                                </nav>
                            </div>

                            <div className=" flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu md:hidden"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <line x1="3" y1="12" x2="21" y2="12" className={twMerge(' origin-left transition', isOpen && "opacity-0")}></line>
                                    <line x1="3" y1="6" x2="21" y2="6" className={twMerge(' origin-left transition', isOpen && " rotate-45 -translate-y-1")}></line>
                                    <line x1="3" y1="18" x2="21" y2="18" className={twMerge(' origin-left transition', isOpen && " -rotate-45 translate-y-1")}></line>
                                </svg>

                                {user ? (
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className=" text-white bg-[#1FBCF9] rounded-full p-2.5 hover:bg-[#1FBCF9] hover:text-white hidden md:flex">Dashboard
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => openSignIn({ redirectUrl: '/form' })}
                                        className=" text-white bg-[#1FBCF9] rounded-full p-2.5 hover:bg-[#1FBCF9] hover:text-white hidden md:flex">Sign Up
                                    </button>


                                )}
                            </div>

                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -100, height: 0 }}
                                    animate={{ opacity: 1, x: 0, height: "auto" }}
                                    exit={{ opacity: 0, x: -100, height: 0 }}
                                    className='overflow-hidden'>
                                    <div className='flex flex-col gap-4 py-4 items-center'>
                                        {navLinks.map((link, index) => {
                                            return (
                                                <a key={index} href={link.href} className=" hover:text-white transition duration-300">{link.label}</a>
                                            )

                                        })}
                                        {user ? (
                                            <button
                                                onClick={() => navigate('/dashboard')}
                                                className=" text-white bg-[#1FBCF9] rounded-full p-2.5 hover:bg-[#1FBCF9] hover:text-white ">Dashboard</button>

                                        ) : (
                                            <button
                                                onClick={() => openSignIn({ redirectUrl: '/form' })}

                                                className=" text-white bg-[#1FBCF9] rounded-full p-2.5 hover:bg-[#1FBCF9] hover:text-white ">Sign Up</button>

                                        )}
                                    </div>
                                </motion.div>

                            )}
                        </AnimatePresence>

                    </div>

                </div>
            </section>
        </>
    )
}

export default Navbar