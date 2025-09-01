// routes/blogRoutes.js
import express from 'express';
const router = express.Router();
import{
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByUser,
    updateAppointment,
    deleteAppointment
}
from '../controllers/appointmentController.js';

// Create a new appointment
router.post('/', createAppointment);
// Get all appointments
router.get('/', getAllAppointments);
// Get appointments by user ID
router.get('/user/:userId', getAppointmentsByUser);
// Get appointment by ID
router.get('/:appointmentId', getAppointmentById);
// Update appointment by ID
router.put('/:appointmentId', updateAppointment);
// Delete appointment by ID
router.delete('/:appointmentId', deleteAppointment);

export default router;
