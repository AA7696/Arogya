import { useUserProfile } from "@/hooks/useUserProfile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Smile,
  HeartPulse,
  BedDouble,
  Zap,
  Pill,
  Thermometer,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";

const StatCard = ({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string | number;
}) => (
  <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg transition-all hover:scale-[1.015] duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-[#1FBCF9]" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-[#1FBCF9]">{value}</div>
    </CardContent>
  </Card>
);

const DashboardHome = () => {
  const { data: profile, isLoading, isError } = useUserProfile();

  if (isLoading) {
    return <div className="text-center text-white text-lg py-20">Loading your health data...</div>;
  }

  if (isError || !profile) {
    return <div className="text-center text-red-500 text-lg py-20">Failed to load profile data.</div>;
  }

  return (
    <div className="p-12 space-y-10">
      {/* Greeting */}
      <div>
        <p className="text-2xl text-gray-300">Here’s a snapshot of your current health</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Smile} title="Happiness" value={`${profile.happinessLevel ?? 'N/A'}/10`} />
        <StatCard icon={HeartPulse} title="Mood" value={profile.feeling ?? "Not Provided"} />
        <StatCard icon={Zap} title="Stress" value={profile.stressLevel ?? "Not Provided"} />
        <StatCard icon={BedDouble} title="Sleep Quality" value={profile.sleepQuality ?? "Not Provided"} />
      </div>

      {/* Medical Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={Thermometer}
          title="Symptom"
          value={
            profile.symptom
              ? `${profile.symptom} (${profile.symptomDuration || 'Duration Unknown'})`
              : "Not Provided"
          }
        />
        <StatCard
          icon={Pill}
          title="Medication"
          value={
            profile.medicalHistory
              ? `${profile.dosage || 'Dose N/A'} of ${profile.medicalHistory} (${profile.purpose || 'Purpose N/A'})`
              : "Not Provided"
          }
        />
      </div>

      {/* Adherence & Health Tip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={ClipboardCheck}
          title="Prescription Adherence"
          value={profile.prescriptionAdherence || "Not Provided"}
        />
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Tip</CardTitle>
            <Lightbulb className="h-5 w-5 text-[#1FBCF9]" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#1FBCF9]">
              {profile.stressLevel === "Highly"
                ? "Try deep breathing or a 5-minute walk."
                : profile.sleepQuality === "Bad"
                ? "Avoid screens before bed and try herbal tea."
                : "You're doing great! Keep it up!"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
