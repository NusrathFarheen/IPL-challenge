import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
export const generateIntelligence = async (event, module, userPersona = "Expert Analyst") => {
  if (!API_KEY) {
    const clutchScore = event.type === 'wicket' ? 9.2 : 8.4;
    return `[Demo Mode] ${module.name} Analysis: Regarding "${event.text}", our ${module.id} sensors detect a ${clutchScore}/10 impact. ${module.description}. Target persona "${userPersona}" should prepare for a momentum shift.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      You are an elite AI Sports Intelligence Agent specialized in: ${module.name}.
      Module Mission: ${module.prompt}
      
      Live Match Event: "${event.text}"
      User Persona: "${userPersona}"
      
      Task: Provide a sharp, data-driven, and highly engaging analysis of this event. 
      Format the output with bold highlights for key data points.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn("Retrying with fallback model...", error);
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await fallbackModel.generateContent(`Analyze this sports event: ${event.text}`);
      const response = await result.response;
      return response.text();
    } catch (fallbackError) {
      let cleanMessage = error.message;
      if (cleanMessage.includes('API key expired') || cleanMessage.includes('API_KEY_INVALID')) {
        cleanMessage = "API Key Invalid or Expired. Please update the API key in the .env file.";
      } else if (cleanMessage.includes('429')) {
        cleanMessage = "API Quota Exceeded. You have hit the limit for this API key. Please use a different key or wait for the quota to reset.";
      } else {
        cleanMessage = cleanMessage.split('[')[0].trim();
      }
      return `Intelligence Link Offline: ${cleanMessage}`;
    }
  }
};

export const askQuestion = async (question, context, module) => {
  if (!API_KEY) {
    return "I am currently in Demo Mode. To unlock real-time tactical answers, please provide a Gemini API Key in the settings.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      You are the FanIQ AI Assistant, a professional sports analyst.
      Current Match Context: "${context.text}"
      Active Analysis Module: "${module.name}"
      
      User Question: "${question}"
      
      Task: Provide a concise, expert answer to the user's question based on the current match situation. 
      Stay in character as a professional intelligence agent. Max 2-3 sentences.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "The intelligence link was interrupted. Please try again.";
  }
};
