import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

interface ChatMessage {
  sender: "user" | "ai";
  message: string;
}

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiReply: ChatMessage = {
        sender: "ai",
        message: `This is an AI response to: "${input}"`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);

    setInput("");
  };

  return (
    <Card className="p-4 flex flex-col h-[85vh] w-full mx-auto bg-black text-white border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-center">Ask Your Health Assistant</h2>

      <div className="flex-1 overflow-y-auto bg-white/5 p-4 rounded-md border border-white/10 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-[#1FBCF9] text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 gap-2">
        <Input
          placeholder="Ask about your health, symptoms, or medication..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-white/5 text-white placeholder-gray-400 focus-visible:ring-[#1FBCF9]"
        />
        <Button
          onClick={handleSend}
          className="bg-[#1FBCF9] text-white hover:bg-[#1a9bd2]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
