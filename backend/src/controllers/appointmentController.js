import Doctor from "../models/doctormodel.js";
import Appointment from "../models/appointmentmodel.js";
import User from "../models/usermodel.js";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// @desc Create a new appointment and send confirmation email
export const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, appointmentDate, reason, status, notes } = req.body;

    // Validate required fields
    if (!userId || !doctorId || !appointmentDate || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {    
        return res.status(404).json({ message: "User not found" });
    }
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    // Create new appointment
    const newAppointment = await Appointment.create({
      userId,
      doctorId,
      appointmentDate,
      reason,
      status,
      notes,
    });


    // Send confirmation email using Resend
      const {data, error} = await resend.emails.send({
        from: 'agarwal7696@achman.in',
        to: `${user.email}`,
        subject: 'Appointment Confirmation',
        html: `
          <h2>Appointment Confirmed ✅</h2>
          <p>Dear User,</p>
          <p>Your appointment with <strong>${doctor.name}</strong> has been successfully booked for <strong>${new Date(appointmentDate).toLocaleString()}</strong>.</p>
          <p><strong>Specialization:</strong> ${doctor.specialization}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <br/>
          <p>Thank you for choosing Arogya!</p>
        `,
      });
        // if (error) {
        //     console.error("Error sending email:", error);
        //     return res.status(500).json({ message: "Failed to send confirmation email" });
        // }

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// @desc Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// @desc Get appointment by ID
export const getAppointmentById = async (req, res) => {
    const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment" });
  }
};

// @desc Get appointments by user ID
export const getAppointmentsByUser = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    
  try {
    const appointments = await Appointment.find({ userId: userId }).sort({ createdAt: -1 });
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user appointments" });
  }
};

// @desc Update appointment
export const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
        }

  try {
    const updated = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment" });
  }
};


// @desc Delete appointment
export const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;
  try {
    const deleted = await Appointment.findByIdAndDelete(appointmentId);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};

