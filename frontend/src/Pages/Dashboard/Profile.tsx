import { useFormStore } from "@/store/formStore";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { toast } from "react-hot-toast";

export default function ProfileForm() {
  const { formData, updateFormData } = useFormStore();
  const [form, setForm] = useState({ ...formData });
  const { user } = useUser();
  const { mutate, isPending } = useUpdateProfile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Login required to update profile.");
      return;
    }

    const payload = {
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName,
      ...form,
    };

    mutate(payload, {
      onSuccess: () => {
        updateFormData(form);
        toast.success("✅ Profile updated successfully!");
      },
      onError: () => {
        toast.error("❌ Failed to update profile.");
      },
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1fbcf9]">
          🧑‍⚕️ Update Your Health Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Mental & Emotional */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b pb-1">
              🧠 Mental & Emotional
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Mood" name="feeling" value={form.feeling} onChange={handleChange} />
              <InputField
                label="Happiness Level (1-10)"
                name="happinessLevel"
                value={form.happinessLevel}
                onChange={handleChange}
                type="number"
              />
              <SelectField
                label="Stress Level"
                name="stressLevel"
                value={form.stressLevel}
                onChange={handleChange}
                options={["Low", "Moderate", "Highly"]}
              />
              <SelectField
                label="Sleep Quality"
                name="sleepQuality"
                value={form.sleepQuality}
                onChange={handleChange}
                options={["Good", "Average", "Bad"]}
              />
            </div>
          </div>

          {/* Section 2: Symptoms */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b pb-1">🤒 Symptoms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Symptom" name="symptom" value={form.symptom} onChange={handleChange} />
              <InputField label="Duration" name="symptomDuration" value={form.symptomDuration} onChange={handleChange} />
            </div>
          </div>

          {/* Section 3: Medication */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b pb-1">💊 Medication</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Medication Name"
                name="medicalHistory"
                value={form.medicalHistory}
                onChange={handleChange}
              />
              <InputField label="Dosage" name="dosage" value={form.dosage} onChange={handleChange} />
              <InputField
                label="Intake Frequency"
                name="intakeFrequency"
                value={form.intakeFrequency}
                onChange={handleChange}
              />
              <InputField
                label="Prescription Adherence"
                name="prescriptionAdherence"
                value={form.prescriptionAdherence}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isPending}
              className={`transition px-6 py-3 font-semibold rounded-lg shadow-md ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#1fbcf9] text-white"
              }`}
            >
              {isPending ? "Updating..." : "✅ Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
function InputField({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1fbcf9] mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// Reusable Select Component
function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1fbcf9] mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-lg shadow-sm text-white bg-black border border-blue-200 focus:outline-none focus:ring-2 transition-all"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
