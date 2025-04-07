
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Step4() {
    const [formData, setFormData] = useState({
        happinessLevel: 6,
        feeling: "Happy",
        stressLevel: "Slightly",
        sleepQuality: "Good",
    })

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="p-20 space-y-6 flex justify-center">
            <div className="container flex flex-col gap-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Complete your profile</h2>
                    <p className="text-sm text-gray-500">Please provide the following information</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center space-x-4">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= 4
                                    ? "bg-[#1FBCF9] text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step < 4 ? "✓" : step}
                        </div>
                    ))}
                </div>

                {/* Happiness Level */}
                <div>
                    <p className="mb-2 font-medium">How happy are you today?</p>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {[...Array(10)].map((_, i) => {
                            const val = i + 1
                            return (
                                <button
                                    key={val}
                                    className={`border rounded-md py-2 text-smflex  flex justify-center items-center ${formData.happinessLevel === val
                                            ? "bg-[#1FBCF9] text-white"
                                            : "border-gray-300 text-white"
                                        }`}
                                    onClick={() => handleChange("happinessLevel", val)}
                                >
                                    {val}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Mood */}
                <div>
                    <p className="mb-2 font-medium">How do you feel today?</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {["Happy", "Sad", "Angry", "Anxious", "Stressed", "Neutral"].map((mood) => (
                            <button
                                key={mood}
                                className={`border rounded-md py-2 text-sm flex justify-center items-center ${formData.feeling === mood
                                        ? "bg-[#1FBCF9] text-white"
                                        : "border-gray-300 text-white"
                                    }`}
                                onClick={() => handleChange("feeling", mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stress Level */}
                <div>
                    <p className="mb-2 font-medium">How stressed are you today?</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["Not Stressed", "Slightly", "Moderately", "Highly", "Extremely"].map((level) => (
                            <button
                                key={level}
                                className={`border rounded-md py-2 text-sm flex justify-center items-center ${formData.stressLevel === level
                                        ? "bg-[#1FBCF9] text-white"
                                        : "border-gray-300 text-white"
                                    }`}
                                onClick={() => handleChange("stressLevel", level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sleep Quality */}
                <div>
                    <p className="mb-2 font-medium">How would you rate your sleep quality?</p>
                    <div className="grid grid-cols-3 gap-2">
                        {["Good", "Bad", "Average"].map((quality) => (
                            <button
                                key={quality}
                                className={`border rounded-md py-2 text-sm flex justify-center items-center ${formData.sleepQuality === quality
                                        ? "bg-[#1FBCF9] text-white"
                                        : "border-gray-300 text-white"
                                    }`}
                                onClick={() => handleChange("sleepQuality", quality)}
                            >
                                {quality}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row items-center justify-center  md:justify-between mt-4 gap-4">
        <p className="text-xs text-gray-500">You can update these settings in dashboard</p>
        <div className=" flex flex-row gap-3">
        <Button  className="bg-[#1FBCF9] hover:bg-[#1FBCF9] text-white">
          Back
        </Button>

        <Button  className="bg-[#1FBCF9] hover:bg-[#1FBCF9] text-white">
          Next →
        </Button>

        </div>
      </div>

            </div>
        </div>
    )
}
