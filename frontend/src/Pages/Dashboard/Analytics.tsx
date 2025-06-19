import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { useFormStore } from "@/store/formStore"

// Consistent soft color palette
const COLORS = ["#1FBCF9", "#00C49F", "#FFBB28", "#F97316"]

// Reusable Chart Card Wrapper
const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow  dark:bg-slate-800">
    <h3 className="text-lg font-semibold text-white dark:text-white mb-4">{title}</h3>
    <div className="h-[300px]">{children}</div>
  </div>
)

const Analytics = () => {
  const { formData } = useFormStore()

  // Guard Clause: if data is not available
  if (
    !formData ||
    !formData.sleepQuality ||
    !formData.stressLevel ||
    !formData.happinessLevel ||
    !formData.prescriptionAdherence
  ) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        <p>No data available. Please fill out your profile to view analytics.</p>
      </div>
    )
  }

  // Pie Chart Data: Wellness Breakdown
  const wellnessPieData = [
    { name: "Happiness", value: formData.happinessLevel },
    {
      name: "Stress",
      value:
        formData.stressLevel === "Not Stressed"
          ? 10
          : formData.stressLevel === "Extremely"
          ? 1
          : 5,
    },
    {
      name: "Sleep",
      value:
        formData.sleepQuality === "Good"
          ? 10
          : formData.sleepQuality === "Bad"
          ? 3
          : 6,
    },
    {
      name: "Adherence",
      value: formData.prescriptionAdherence === "Always" ? 10 : 5,
    },
  ]

  // Line Chart Data: Mood Trend
  const moodLineData = Array.from({ length: 7 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    happiness: Math.max(
      1,
      Math.min(
        10,
        (formData.happinessLevel ?? 5) + Math.floor(Math.random() * 3 - 1)
      )
    ),
    stress:
      formData.stressLevel === "Extremely"
        ? 10
        : formData.stressLevel === "Not Stressed"
        ? 1
        : 5,
  }))

  // Radar Chart Data: Health Overview
  const radarData = [
    {
      metric: "Sleep",
      score:
        formData.sleepQuality === "Good"
          ? 9
          : formData.sleepQuality === "Average"
          ? 5
          : 2,
    },
    {
      metric: "Stress",
      score:
        formData.stressLevel === "Not Stressed"
          ? 9
          : formData.stressLevel === "Extremely"
          ? 2
          : 5,
    },
    {
      metric: "Happiness",
      score: formData.happinessLevel,
    },
    {
      metric: "Adherence",
      score:
        formData.prescriptionAdherence === "Always"
          ? 10
          : formData.prescriptionAdherence === "Never"
          ? 2
          : 5,
    },
  ]

  // Bar Chart Data
  const barData = [
    {
      name: "User",
      Sleep:
        formData.sleepQuality === "Good"
          ? 9
          : formData.sleepQuality === "Average"
          ? 5
          : 2,
      Adherence:
        formData.prescriptionAdherence === "Always"
          ? 10
          : formData.prescriptionAdherence === "Never"
          ? 2
          : 5,
    },
  ]

  return (
    <div className="p-6  dark:bg-[#0f172a] min-h-screen">
      {/* Dashboard Header */}
      <h2 className="text-3xl font-bold text-[#1fbcf9] mb-2">Analytics</h2>
      <p className="text-white dark:text-gray-400 mb-6">
        Visual summary of your health & wellness data
      </p>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 bg-transparent">
        {/* Pie Chart */}
        <ChartCard title="Wellness Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={wellnessPieData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                {wellnessPieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard title="Mood Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodLineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="happiness" stroke="#1FBCF9" />
              <Line type="monotone" dataKey="stress" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Radar Chart */}
        <ChartCard title="Health Overview">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Sleep Quality vs. Adherence">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sleep" fill="#1FBCF9" />
              <Bar dataKey="Adherence" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

export default Analytics
