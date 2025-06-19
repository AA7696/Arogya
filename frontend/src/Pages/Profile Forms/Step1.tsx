import { useFormStore } from "@/store/formStore"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function Step1() {
  const { formData, updateFormData } = useFormStore()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  const handleSelectGender = (gender: string) => {
    updateFormData({
      gender: gender
     })
  }

  const handleSelectBloodGroup = (blodGroup: string) => {
    updateFormData({ blodGroup })
  }

  return (
    <div className="p-10 space-y-6 flex justify-center">
      <div className="container flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Complete your profile</h2>
          <p className="text-sm text-white">Please provide the following information</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 1 ? "bg-[#1FBCF9] text-white" : "bg-gray-200 text-gray-500"
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
              type="button"
                key={g}
                className={`border rounded-md p-4 font-normal flex justify-center items-center ${
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
            <Input
            type="number"
              name="weight"
              value={formData.weight || ""}
              onChange={handleInput}
              placeholder="e.g. 45"
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Height (cm)</p>
            <Input
            type="number"
              name="height"
              value={formData.height || ""}
              onChange={handleInput}
              placeholder="e.g. 160"
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">What is your age?</p>
            <Input
            type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleInput}
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Your blood group</p>
            <Select
              onValueChange={handleSelectBloodGroup}
              value={formData.blodGroup || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
