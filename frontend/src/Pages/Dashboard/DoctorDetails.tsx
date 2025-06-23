import { useParams } from "react-router-dom";
import doctors from '../../assets/doctor.json';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  if (!doctor) return <div className="p-6 text-center text-red-500">Doctor not found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Appointment Booked:", booking);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Doctor Info Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-72 h-72 rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="space-y-3 text-white">
          <h2 className="text-3xl font-bold">{doctor.name}</h2>
          <p className="text-lg">{doctor.specialization}</p>
          <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
          <p><span className="font-semibold">Location:</span> {doctor.location}</p>
          <p><span className="font-semibold">Rating:</span> ⭐ {doctor.rating}</p>
        </div>
      </div>

      {/* Appointment Form Section */}
      <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-md space-y-6">
        <h3 className="text-2xl font-semibold text-white">Book an Appointment</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-white mb-1.5">Full Name</Label>
            <Input name="name" value={booking.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email" className="text-white mb-1.5">Email</Label>
            <Input name="email" value={booking.email} onChange={handleChange} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-white mb-1.5">Date</Label>
            <Input type="date" name="date" value={booking.date} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="time" className="text-white mb-1.5">Time</Label>
            <Input type="time" name="time" value={booking.time} onChange={handleChange} />
          </div>
        </div>

        <div>
          <Label htmlFor="reason" className="text-white mb-1.5">Reason for Appointment</Label>
          <Textarea
            name="reason"
            value={booking.reason}
            onChange={handleChange}
            placeholder="Mention your concern briefly"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="bg-[#1FBCF9] text-white w-full"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
