import { GoogleGenAI, Type } from "@google/genai";
import { LogicQuestion, ContextScenario } from "../types";

// Helper to get AI instance safely
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Fallback data in case API fails or key is missing
const LOGIC_FALLBACK: LogicQuestion[] = [
  { item: "苹果", correctCategory: "水果", options: ["水果", "交通工具", "工具", "家具"] },
  { item: "锤子", correctCategory: "工具", options: ["动物", "工具", "衣物", "电子产品"] },
  { item: "沙发", correctCategory: "家具", options: ["家具", "食物", "星球", "运动"] },
  { item: "老鹰", correctCategory: "动物", options: ["花卉", "动物", "国家", "元素"] },
  { item: "轿车", correctCategory: "交通工具", options: ["水果", "交通工具", "职业", "天气"] },
];

const CONTEXT_FALLBACK: ContextScenario = {
  items: ["一把生锈的钥匙", "一个红色的气球", "一只打瞌睡的猫"],
  theme: "悬疑故事"
};

export const generateLogicQuestions = async (): Promise<LogicQuestion[]> => {
  const ai = getAI();
  if (!ai) return LOGIC_FALLBACK;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "生成5个中文分类逻辑题。对于每一个问题，提供一个具体的物品（item），它所属的正确类别（correctCategory），以及3个不正确的干扰类别。确保类别之间区分明显。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              correctCategory: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 options including the correct one."
              }
            },
            required: ["item", "correctCategory", "options"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as LogicQuestion[];
    }
    return LOGIC_FALLBACK;
  } catch (error) {
    console.error("Gemini API Error (Logic):", error);
    return LOGIC_FALLBACK;
  }
};

export const generateContextScenario = async (): Promise<ContextScenario> => {
  const ai = getAI();
  if (!ai) return CONTEXT_FALLBACK;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "生成3个随机、独特且具象的中文物体名词，它们之间应该完全不相关，用于记忆联想训练。并建议一个故事类型主题（theme）。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: { type: Type.ARRAY, items: { type: Type.STRING } },
            theme: { type: Type.STRING }
          },
          required: ["items", "theme"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ContextScenario;
    }
    return CONTEXT_FALLBACK;
  } catch (error) {
    console.error("Gemini API Error (Context):", error);
    return CONTEXT_FALLBACK;
  }
};