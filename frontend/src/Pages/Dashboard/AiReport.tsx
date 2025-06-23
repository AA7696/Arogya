import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import jsPDF from "jspdf";

export default function AiReport() {
  const [email, setEmail] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!email) return;

    setLoading(true);
    setReport("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/report/generate", { email });
      setReport(response.data.report);
    } catch (err) {
      setError("Failed to generate report. Please check the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("AI Health Report", 10, 10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(report, 180);
    doc.text(lines, 10, 20);
    doc.save("AI_Health_Report.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 bg-black border border-white/10 text-white">
        <h2 className="text-xl font-bold mb-4">Generate AI Health Report</h2>
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 placeholder:text-gray-400 text-white"
          />
          <Button onClick={handleGenerate} disabled={loading} className="bg-[#1FBCF9] text-white">
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
        {error && <p className="text-red-400 mt-3">{error}</p>}
      </Card>

      {report && (
        <Card className="p-6 bg-white/5 border border-white/10 text-white">
          <h3 className="text-lg font-semibold mb-3">Your Detailed Report</h3>
          <Textarea
            value={report}
            rows={20}
            readOnly
            className="w-full bg-black border border-white/20 text-white"
          />
          <Button onClick={downloadPDF} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
            Download PDF
          </Button>
        </Card>
      )}
    </div>
  );
}
