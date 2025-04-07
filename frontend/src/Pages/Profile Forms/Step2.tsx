'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"

const symptoms = [
  "Headache", "Nausea", "Vomiting", "Diarrhea", "Fatigue",
  "Insomnia", "Constipation", "Muscle Pain", "Joint Pain", "Other"
]

const frequencyOptions = ["Daily", "Weekly", "Monthly", "Rarely"]
const intensityLevels = Array.from({ length: 10 }, (_, i) => i + 1)

export default function Step2() {
  const [formData, setFormData] = useState({
    symptom: "",
    frequency: "",
    intensity: 0,
  })

  const selectSymptom = (symptom: string) =>
    setFormData({ ...formData, symptom })

  const selectFrequency = (freq: string) =>
    setFormData({ ...formData, frequency: freq })

  const selectIntensity = (level: number) =>
    setFormData({ ...formData, intensity: level })

  return (
    <div className=" p-20 space-y-6 flex justify-center">
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
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 2
                ? "bg-[#1FBCF9] text-white"
                : step < 2
                ? "bg-[#1FBCF9] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < 2 ? "✓" : step}
          </div>
        ))}
      </div>

      {/* Symptom Selection */}
      <div>
        <p className="mb-2 font-medium">What symptom are you experiencing?</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {symptoms.map((sym) => (
            <button
              key={sym}
              className={`border rounded-md py-2 text-sm flex justify-center items-center ${
                formData.symptom === sym
                  ? "bg-[#1FBCF9] text-white"
                  : "border-gray-300 text-white"
              }`}
              onClick={() => selectSymptom(sym)}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency Selection */}
      <div>
        <p className="mb-2 font-medium">How often do you experience it?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {frequencyOptions.map((freq) => (
            <button
              key={freq}
              className={`border rounded-md py-2 text-sm flex justify-center items-center ${
                formData.frequency === freq
                  ? "bg-[#1FBCF9] text-white"
                  : "border-gray-300 text-white"
              }`}
              onClick={() => selectFrequency(freq)}
            >
              {freq}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Selection */}
      <div>
        <p className="mb-2 font-medium">How intense is it?</p>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {intensityLevels.map((level) => (
            <button
              key={level}
              className={`border rounded-md py-2 text-sm flex justify-center items-center ${
                formData.intensity === level
                  ? "bg-[#1FBCF9] text-white"
                  : "border-gray-300 text-white"
              }`}
              onClick={() => selectIntensity(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-between mt-4">
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
