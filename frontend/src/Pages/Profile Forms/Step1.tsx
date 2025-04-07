
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function Step1() {
  const [formData, setFormData] = useState({
    gender: "Male",
    weight: "",
    height: "",
    age: "",
    bloodGroup: "",
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectGender = (gender: string) => {
    setFormData({ ...formData, gender })
  }

  const handleSelectBloodGroup = (value: string) => {
    setFormData({ ...formData, bloodGroup: value })
  }

  return (
    <div className="  p-20 space-y-6 flex justify-center">
        <div className=" container flex flex-col gap-8 ">
                  {/* Header */}
      <div className="text-center ">
        <h2 className="text-2xl font-bold">Complete your profile</h2>
        <p className="text-sm text-white">Please provide the following information</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center space-x-4">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 1 ? 'bg-[#1FBCF9] text-grey-500' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Gender */}
      <div>
        <p className="mb-2 font-medium">Specify your gender</p>
        <div className="grid grid-cols-3 gap-2">
          {["Male", "Female", "Other"].map((g) => (
            <button
              key={g}
              className={`border rounded-md p-4 font-normal flex justify-center items-center  ${
                formData.gender === g
                  ? "bg-[#1FBCF9] text-white"
                  : "border-gray-300 text-white"
              }`}
              onClick={() => handleSelectGender(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-sm font-medium">Weight (kg)</p>
          <Input name="weight" value={formData.weight} onChange={handleInput} placeholder="e.g. 45" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium">Height (cm)</p>
          <Input name="height" value={formData.height} onChange={handleInput} placeholder="e.g. 160" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium">What is your age?</p>
          <Input name="age" value={formData.age} onChange={handleInput} placeholder="e.g. 18" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium">Your blood group</p>
          <Select onValueChange={handleSelectBloodGroup}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent className=" bg-black text-white">
              {bloodGroups.map((group) => (
                <SelectItem  key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Note + Next Button */}
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
