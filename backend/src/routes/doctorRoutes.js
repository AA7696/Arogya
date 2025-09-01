// routes/blogRoutes.js
import express from 'express';
const router = express.Router();
import{
    createDoctorProfile,
    getAllDoctors,
    getDoctorById,
    updateDoctorProfile,
    deleteDoctorProfile
}
from '../controllers/doctorController.js';
// Create a new doctor profile
router.post('/', createDoctorProfile);
// Get all doctor profiles
router.get('/', getAllDoctors);
// Get doctor profile by ID
router.get('/:doctorId', getDoctorById);
// Update doctor profile by ID
router.put('/:doctorId', updateDoctorProfile);
// Delete doctor profile by ID
router.delete('/:doctorId', deleteDoctorProfile);



export default router;
