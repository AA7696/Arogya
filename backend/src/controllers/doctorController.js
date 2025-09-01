import Doctor from "../models/doctormodel.js";
import User from "../models/usermodel.js";
// @desc Create a new doctor profile
export const createDoctorProfile = async (req, res) => {
    try {
        const {  name, specialization, qualifications, experience, bio, availableSlots, contact, imageUrl } = req.body;
    
        const doctorProfile = new Doctor({
        name,
        specialization,
        qualifications,
        experience,
        bio,
        availableSlots,
        contact,
        imageUrl,
        });
    
        await doctorProfile.save();
    
        res.status(201).json({ message: "Doctor profile created successfully", doctorProfile });
    } catch (error) {
        console.error("Error creating doctor profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc Get all doctor profiles
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ createdAt: -1 }); // Newest first
        if(doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc Get doctor profile by doctorId
export const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc update doctor profile
export const updateDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { name, specialization, qualifications, experience, bio, availableSlots, contact, imageUrl } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, {
            name,
            specialization,
            qualifications,
            experience,
            bio,
            availableSlots,
            contact,
            imageUrl
        }, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor profile updated successfully", updatedDoctor });
    } catch (error) {
        console.error("Error updating doctor profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc Delete doctor profile
export const deleteDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

