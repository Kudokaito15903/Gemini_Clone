// gemini.js
const geminiApiKey = 'AIzaSyAJ0AL6a_UH4TJpg0W8Mcw4Mjw2yInmOt0';
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// Thay đổi từ require sang import
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = geminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

// Xuất hàm runChat
export default runChat;
