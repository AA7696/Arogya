// controllers/aiController.js
import { GoogleGenAI } from '@google/genai';
import User from '../models/usermodel.js';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateHealthChatResponse = async (req, res) => {
  try {
    const { message, userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const userSummary = `
      Age: ${user.age}, Gender: ${user.gender}, Weight: ${user.weight}kg, Height: ${user.height}cm, Blood Group: ${user.bloodGroup}.
      Symptoms: ${user.symptom} (${user.symptomDuration}, Intensity: ${user.symptomIntensity}/10).
      Medication: ${user.medicalHistory}, Dosage: ${user.dosage}, Purpose: ${user.purpose}.
      Mental Well-being: Happiness Level: ${user.happinessLevel}/10, Stress Level: ${user.stressLevel}, Sleep: ${user.sleepQuality}.
    `;

    const modelName = 'gemini-1.5-flash';

    const contents = [
      {
        role: 'user',
        parts: [{ text: `You are a friendly AI health assistant. Reply with personalized and empathetic responses. 
Avoid repeating phrases like "I am an AI" multiple times. 
Use the user's profile data below to make context-aware replies.` }],
      },
      {
        role: 'model',
        parts: [{ text: "Understood. I will provide wellness guidance based on the user's provided health profile." }],
      },
      {
        role: 'user',
        parts: [{
          text: `
            Based on the following health profile:
            ${userSummary}
            The user asks: "${message}"
            Please provide a helpful and empathetic wellness guidance.
          `,
        }],
      },
    ];

    const apiResponse = await genAI.models.generateContent({ // Renamed result to apiResponse for clarity
      model: modelName,
      contents: contents,
    });

    let aiReply = 'Sorry, I could not generate a response at this time.';

    // --- MODIFIED EXTRACTION LOGIC HERE ---
    if (apiResponse && apiResponse.candidates && apiResponse.candidates.length > 0) {
        const firstCandidate = apiResponse.candidates[0];
        if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
            // Filter for parts that have a 'text' property and join them
            const textParts = firstCandidate.content.parts
                                .filter(part => part.text)
                                .map(part => part.text);
            if (textParts.length > 0) {
                aiReply = textParts.join(''); // Join all text parts
            } else {
                console.warn('Gemini response candidate had content parts, but no text parts found.');
            }
        } else {
            console.warn('Gemini response candidate did not have expected content.parts structure.');
        }
    } else {
        console.warn('Gemini response did not contain candidates or was empty:', apiResponse);
    }
    // --- END MODIFIED EXTRACTION LOGIC ---

    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error('AI Chat Error (Gemini):', error);

    if (error.response && error.response.status) {
      console.error('Gemini API Response Error Status:', error.response.status);
      console.error('Gemini API Response Data:', await error.response.json().catch(() => 'Failed to parse error response data'));
      return res.status(error.response.status).json({
        message: 'Gemini API Error',
        status: error.response.status,
        details: await error.response.json().catch(() => 'No additional details'),
      });
    } else if (error.message) {
      return res.status(500).json({
        message: 'Error communicating with Gemini API',
        error: error.message,
      });
    }

    return res.status(500).json({
      message: 'Unexpected error',
      error: error.message,
    });
  }
};