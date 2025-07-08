// controllers/aiController.js
import { GoogleGenAI } from '@google/genai';
import User from '../models/usermodel.js';
import puppeteer from 'puppeteer'; // Import puppeteer
import MarkdownIt from 'markdown-it'; // Import Markdown parser

// Initialize Gemini
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Initialize Markdown parser
const md = new MarkdownIt();

// --- NEW FUNCTION: generateHealthReport with PDF Download using Puppeteer ---
export const generateHealthReport = async (req, res) => {
  let browser; // Declare browser outside try-catch to ensure it's closed in finally
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const userProfileForReport = `
      User Health Profile:
      - Age: ${user.age}
      - Gender: ${user.gender}
      - Weight: ${user.weight} kg
      - Height: ${user.height} cm
      - Blood Group: ${user.bloodGroup}

      Current Symptoms:
      - Symptom: ${user.symptom || 'N/A'}
      - Duration: ${user.symptomDuration || 'N/A'}
      - Intensity: ${user.symptomIntensity ? user.symptomIntensity + '/10' : 'N/A'}

      Medical History & Medication:
      - Medical History Notes: ${user.medicalHistory || 'N/A'}
      - Current Medication: ${user.dosage ? `Dosage: ${user.dosage}, Purpose: ${user.purpose}` : 'N/A'}

      Mental Well-being:
      - Happiness Level: ${user.happinessLevel ? user.happinessLevel + '/10' : 'N/A'}
      - Stress Level: ${user.stressLevel || 'N/A'}
      - Sleep Quality: ${user.sleepQuality || 'N/A'}
    `;

    const modelName = 'gemini-1.5-flash';

    const contents = [
      {
        role: 'user',
        parts: [{ text: `You are an AI assistant specialized in generating comprehensive health and wellness reports. Your goal is to analyze the provided user health profile and generate a detailed report. The report should be informative, easy to understand, and provide actionable insights. Do NOT give medical diagnoses or prescribe treatments. Always advise consulting a doctor for any health concerns. Format the report using clear Markdown headings and bullet points.` }],
      },
      {
        role: 'model',
        parts: [{ text: `Understood. I will generate a detailed health and wellness report based on the provided user profile, focusing on informative insights and general wellness advice, always advising professional medical consultation, and formatted using Markdown.` }],
      },
      {
        role: 'user',
        parts: [{
          text: `
            Please generate a comprehensive health and wellness report for the following user profile.
            Structure the report with the following sections using Markdown headings (e.g., # Section Title):
            # Arogya
            # Health and Wellness Report for ${user.name}

            ## 1. Summary of Health Profile
            A brief overview of the user's key health data.

            ## 2. Analysis of Symptoms
            Discuss the reported symptoms and potential general implications, emphasizing the need for professional evaluation.

            ## 3. Mental Well-being Insights
            Provide insights based on happiness, stress, and sleep data, offering general advice for improvement.

            ## 4. General Wellness Recommendations
            Offer personalized general wellness recommendations (e.g., diet, exercise, hydration, stress management, sleep hygiene) based on the entire profile.

            ## 5. Important Disclaimer
            A prominent disclaimer that this report is for informational purposes only and not a substitute for professional medical advice.

            Here is the user's health profile:
            ${userProfileForReport}
          `,
        }],
      },
    ];

    const apiResponse = await genAI.models.generateContent({
      model: modelName,
      contents: contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2000,
      },
    });

    let healthReportMarkdown = 'Sorry, I could not generate the health report at this time.';

    if (apiResponse && apiResponse.candidates && apiResponse.candidates.length > 0) {
        const firstCandidate = apiResponse.candidates[0];
        if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
            const textParts = firstCandidate.content.parts
                                .filter(part => part.text)
                                .map(part => part.text);
            if (textParts.length > 0) {
                healthReportMarkdown = textParts.join('');
            } else {
                console.warn('Gemini response candidate had content parts, but no text parts found for report.');
            }
        } else {
            console.warn('Gemini response candidate did not have expected content.parts structure for report.');
        }
    } else {
        console.warn('Gemini response for report did not contain candidates or was empty:', apiResponse);
    }

    // --- PDF GENERATION LOGIC using Puppeteer ---
    if (healthReportMarkdown === 'Sorry, I could not generate the health report at this time.') {
      return res.status(500).json({ message: healthReportMarkdown });
    }

    // Convert Markdown to HTML
    const healthReportHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Health and Wellness Report</title>
          <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 40px; }
              h1, h2, h3 { color: #2c3e50; margin-top: 1.5em; margin-bottom: 0.5em; }
              h1 { font-size: 2em; text-align: center; color: #3498db; }
              h2 { font-size: 1.5em; border-bottom: 2px solid #eee; padding-bottom: 5px; }
              h3 { font-size: 1.2em; }
              p { margin-bottom: 1em; }
              ul { list-style-type: disc; margin-left: 20px; margin-bottom: 1em; }
              li { margin-bottom: 0.5em; }
              .disclaimer { font-size: 0.9em; color: #e74c3c; border: 1px solid #e74c3c; padding: 10px; margin-top: 2em; }
          </style>
      </head>
      <body>
          ${md.render(healthReportMarkdown)}
      </body>
      </html>
    `;

    // Launch a headless browser instance
    browser = await puppeteer.launch({
      headless: true, // Set to 'new' for new headless mode, or false for visible browser (good for debugging)
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Essential for many Linux environments, especially Docker/cloud
    });
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(healthReportHTML, {
      waitUntil: 'networkidle0', // Wait until network connections are idle
    });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Important for background colors/images from CSS
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
      // You can add headerTemplate/footerTemplate here for page numbers, etc.
    });

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Health_Report_${user.email.split('@')[0]}_${new Date().toISOString().split('T')[0]}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('AI Health Report Error (Gemini/PDF):', error);
    if (error.response && error.response.status) {
      console.error('Gemini API Response Error Status:', error.response.status);
      console.error('Gemini API Response Data:', await error.response.json().catch(() => 'Failed to parse error response data'));
      return res.status(error.response.status).json({
        message: 'Gemini API Error during report generation',
        status: error.response.status,
        details: await error.response.json().catch(() => 'No additional details'),
      });
    } else if (error.message) {
      return res.status(500).json({
        message: 'Error communicating with Gemini API or generating PDF',
        error: error.message,
      });
    }
    return res.status(500).json({
      message: 'Unexpected error during report generation',
      error: error.message,
    });
  } finally {
    // Ensure the browser is closed even if an error occurs
    if (browser) {
      await browser.close();
    }
  }
};