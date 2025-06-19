import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function Step5() {
    const navigate = useNavigate()
    const { width, height } = useWindowSize()
    const handleRedirect = () => {
        navigate("/dashboard");
    };

    return (
        <div className=" p-20 space-y-6 flex justify-center">
            <Confetti
                width={width}
                height={height}
            />
            <div className="container flex flex-col gap-8 justify-center items-center">
                {/* Header */}
                <div className=" text-center">
                    <h2 className="text-2xl font-bold">You have completed your profile</h2>
                    <p className="text-sm text-gray-500">Procede To Your Dashboard</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-center space-x-4">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-[#1FBCF9] text-white"
                        >
                            ✓
                        </div>
                    ))}
                </div>

                {/* Confetti Animation (can be animated later with a library like react-confetti) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="animate-fade-in">
                        {/* Decorative confetti blocks (optional) */}
                        <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-400 rotate-45"></div>
                        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-green-400 rotate-45"></div>
                        <div className="absolute top-1/2 right-10 w-2 h-2 bg-yellow-400 rotate-45"></div>
                        {/* Add more for realism or use a confetti library */}
                    </div>
                </div>

                {/* Illustration */}
                <div className="relative z-10">
                    {/* <Image
          src="/congrats.png" // Replace with actual path or hosted image
          alt="Success Illustration"
          width={160}
          height={160}
          className="mx-auto"
        /> */}
                </div>

                {/* Completion Message */}
                <div className="relative z-10 space-y-2 text-center">
                    <h3 className="text-xl font-semibold">You're all done!</h3>
                    <p className="text-white text-sm">
                        Congratulations, you've completed the onboarding process. Get ready to start your journey to better health with Arogya.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="relative z-10">
                    <Button
                        onClick={handleRedirect}
                        className="bg-[#1FBCF9] hover:bg-[#1FBCF9] text-white">
                        Get personalized Dashboard →
                    </Button>
                </div>

            </div>
        </div>
    )
}
