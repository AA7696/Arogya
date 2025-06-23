import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

type Doctor = {
  id: string
  name: string
  specialization: string
  image: string
  experience: string
  rating: number
  location: string
}

interface Props {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <Card className=" overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-3">
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-center" />
      <CardHeader>
        <CardTitle className="text-lg text-white bg-black p-2 rounded">{doctor.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p className="text-white">{doctor.specialization}</p>
        <p className="text-white">{doctor.experience} experience</p>
        <p className="text-white">{doctor.location}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" /> <span>{doctor.rating}</span>
        </div>
        <Link to={`/dashboard/doctors/${doctor.id}`}>
          <Button className="mt-2 w-full bg-[#1FBCF9] text-white">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
