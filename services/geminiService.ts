
import { GoogleGenAI } from "@google/genai";

export const getSavingsInsight = async (target: number, current: number): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    return "Keep saving to reach your goal!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const remaining = target - current;
    
    const prompt = `My savings goal is ${target} INR. I have saved ${current} INR. Write a very short, single-sentence, encouraging, and personalized message for me about my progress. Maximum 15 words. Don't use markdown or special characters. For example: "Great job! Only ${remaining} INR to go." or "You're getting so close, keep it up!".`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            // Disable thinking for very low latency response
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    // Provide a fallback message
    return `You've saved ₹${current.toFixed(2)}. Keep going!`;
  }
};
