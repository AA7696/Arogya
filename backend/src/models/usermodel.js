import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Step 1: Personal Info
  gender: String,
  weight: Number,
  height: Number,
  age: Number,
  bloodGroup: String,

  // Step 2: Symptom Tracking
  symptom: String,
  symptomDuration: String,
  symptomIntensity: Number,

  // Step 3: Medication
  medicalHistory: String,
  dosage: String,
  purpose: String,
  intakeFrequency: String,
  prescriptionAdherence: String,

  // Step 4: Well-being Info
  happinessLevel: Number,
  feeling: String,
  stressLevel: String,
  sleepQuality: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
