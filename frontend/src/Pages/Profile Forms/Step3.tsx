
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormStore } from "@/store/formStore"

const frequencyOptions = ["Daily", "Weekly", "Monthly", "Rarely"]
const adherenceOptions = ["Always", "Often", "Sometimes", "Never", "Rarely"]

export default function Step3() {
  const { formData, updateFormData } = useFormStore()

  const updateField = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="space-y-6 flex justify-center">
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
                step <= 3
                  ? "bg-[#1FBCF9] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < 3 ? "✓" : step}
            </div>
          ))}
        </div>

        {/* Medicine Name and Dosage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-1 font-medium">Which medicines are you taking?</p>
            <Input
              placeholder="Ex: paracetamol"
              value={formData.medicalHistory || ""}
              onChange={(e) => updateField("medicalHistory", e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1 font-medium">What is the dosage?</p>
            <Input
              placeholder="Ex: 500mg, 1 tablet"
              value={formData.dosage || ""}
              onChange={(e) => updateField("dosage", e.target.value)}
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <p className="mb-1 font-medium">What is the purpose of this medication?</p>
          <Textarea
            placeholder="For headache, fever, pain relief"
            value={formData.purpose || ""}
            onChange={(e) => updateField("purpose", e.target.value)}
          />
        </div>

        {/* Intake Frequency */}
        <div>
          <p className="mb-2 font-medium">How often do you take it?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {frequencyOptions.map((freq) => (
              <button
              type="button"
                key={freq}
                className={`border rounded-md py-2 text-sm flex justify-center items-center ${
                  formData.intakeFrequency === freq
                    ? "bg-[#1FBCF9] text-white"
                    : "border-gray-300 text-white"
                }`}
                onClick={() => updateField("intakeFrequency", freq)}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Prescription Adherence */}
        <div>
          <p className="mb-2 font-medium">How often do you follow the prescription?</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {adherenceOptions.map((opt) => (
              <button
              type="button"
                key={opt}
                className={`border rounded-md py-2 text-sm flex justify-center items-center ${
                  formData.prescriptionAdherence === opt
                    ? "bg-[#1FBCF9] text-white"
                    : "border-gray-300 text-white"
                }`}
                onClick={() => updateField("prescriptionAdherence", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
