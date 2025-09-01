import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, 
    required: true,
    min: 0
  },
  bio: {
    type: String,
    default: "",
  },
  availableSlots: [
    {
      type: Date, 
    },
  ],
  contact: {
    phone: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
  },
  imageUrl: {
    type: String,
    default: ""
  },
  ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
},{
    timestamps: true,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
