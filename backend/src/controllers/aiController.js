// controllers/aiController.js
import OpenAI from 'openai';
import User from '../models/usermodel.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateHealthChatResponse = async (req, res) => {
  console.log("Hello")
  
//   try {
//     const { message, userEmail } = req.body;
//     console.log(message,userEmail);
    

//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(404).json({ message: 'User profile not found' });
//     }

//     const userSummary = `
//       Age: ${user.age}, Gender: ${user.gender}, Weight: ${user.weight}kg, Height: ${user.height}cm, Blood Group: ${user.bloodGroup}.
//       Symptoms: ${user.symptom} (${user.symptomDuration}, Intensity: ${user.symptomIntensity}/10).
//       Medication: ${user.medicalHistory}, Dosage: ${user.dosage}, Purpose: ${user.purpose}.
//       Mental Well-being: Happiness Level: ${user.happinessLevel}/10, Stress Level: ${user.stressLevel}, Sleep: ${user.sleepQuality}.
//     `;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       messages: [
//         {
//           role: 'system',
//           content: `You are a helpful AI medical assistant (not a doctor). Give wellness guidance based on the user's profile.`,
//         },
//         {
//           role: 'user',
//           content: `
//             Based on the following health profile:
//             ${userSummary}
//             The user asks: "${message}"
//           `,
//         },
//       ],
//     });

//     const aiReply = response.choices[0].message.content;
//     res.status(200).json({ reply: aiReply });
//   } catch (error) {
//   console.error('AI Chat Error:', error);

//   if (error.response) {
//     console.error('OpenAI API Response Error:', error.response.status, error.response.data);
//     return res.status(500).json({
//       message: 'OpenAI API Error',
//       status: error.response.status,
//       data: error.response.data,
//     });
//   }

//   if (error.request) {
//     console.error('OpenAI API Request Error:', error.request);
//     return res.status(500).json({
//       message: 'OpenAI API request error',
//     });
//   }

//   return res.status(500).json({
//     message: 'Unexpected error',
//     error: error.message,
//   });
// }

};
