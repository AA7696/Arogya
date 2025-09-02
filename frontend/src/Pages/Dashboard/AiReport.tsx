import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DownloadCloud, Loader2 } from "lucide-react";
import axios from "axios";

export default function AiReport() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        "/api/v1/aichat/report",
        { userEmail: email },
        { responseType: "blob" } // Important to get PDF as binary
      );

      // Create a download link for the blob
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Health_Report_${email.split("@")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to generate or download the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto mt-10 text-white bg-black border border-white/10 shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#1FBCF9]">
        Generate Your AI Health Report
      </h2>

      <p className="text-sm text-gray-300 text-center mb-4">
        Enter your email to receive a detailed AI-generated wellness report based on your health profile.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="bg-white/5 text-white placeholder-gray-400 focus-visible:ring-[#1FBCF9] flex-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          onClick={handleDownload}
          disabled={loading}
          className="bg-[#1FBCF9] hover:bg-[#1aa3e0] text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <DownloadCloud className="w-4 h-4 mr-2" />
              Download Report
            </>
          )}
        </Button>
      </div>

      {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}
    </Card>
  );
}
