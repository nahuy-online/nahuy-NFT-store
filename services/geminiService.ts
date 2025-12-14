import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = (useThinking: boolean = false) => {
  const ai = getClient();
  
  const modelName = 'gemini-3-pro-preview';
  
  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  chatSession = ai.chats.create({
    model: modelName,
    config: config,
  });
  
  return chatSession;
};

export const sendMessageToGemini = async (message: string, useThinking: boolean = false): Promise<string> => {
  try {
    if (!chatSession) {
      initializeChat(useThinking);
    }

    if (!chatSession) {
        throw new Error("Failed to initialize chat session");
    }
    
    const response: GenerateContentResponse = await chatSession.sendMessage({ 
        message: message 
    });

    return response.text || "Извините, я не смог сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при связи с ИИ. Попробуйте позже.";
  }
};