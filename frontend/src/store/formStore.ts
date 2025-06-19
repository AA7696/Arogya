import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FormData {
    name: string,
    email: string,

    // Step 1
    gender: string,
    weight: number,
    height: number,
    age: number,
    blodGroup: string,

    // Step 2
    symptom: string,
    symptomDuration: string,
    symptomIntensity: number,

    // Step 3
    medicalHistory: string,
    dosage: string,
    purpose: string,
    intakeFrequency: string,
    prescriptionAdherence: string,

    // Step 4
    happinessLevel: number
    feeling: string
    stressLevel: string
    sleepQuality: string

}

interface FormStore {
    formData: Partial<FormData>,
    updateFormData: (newData: Partial<FormData>) => void
    resetFormData: () => void
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: {},
      updateFormData: (newData) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...newData,
          },
        })),
      resetFormData: () => set({ formData: {} }),
    }),
    {
      name: 'form-storage', // Key used in localStorage
    }
  )
)