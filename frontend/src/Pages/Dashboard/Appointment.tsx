import DoctorCard from "./DoctorCard"
import doctors from '../../assets/doctor.json'


export default function Appointment() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Find a Doctor</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  )
}
