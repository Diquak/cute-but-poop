import { GoogleGenAI } from "@google/genai";
import { ROLE_DESCRIPTIONS } from '../constants';
import { UserData } from '../types';

interface AIRequestParams {
  userData: UserData;
  isFollowUp: boolean;
}

const calculateAge = (birthDate: string): number => {
  if (!birthDate) return 18; // Default
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const fetchFairyAnswer = async ({ userData, isFollowUp }: AIRequestParams): Promise<string> => {
  const age = calculateAge(userData.birthDate);
  const roleDescription = ROLE_DESCRIPTIONS[userData.role];

  // Construct System Prompt based on Spec logic
  // Modified to be more "random", "abstract" and "short"
  const systemPrompt = `你是一本「厭世解答之書」。
你的角色是 ${userData.role}。
請根據角色的性格：${roleDescription}。
任務：請完全忽略使用者問題的具體細節與事實，給予一個「非常簡短、隨機、模稜兩可」的厭世指引。
規則：
1. **絕對不要**針對問題的具體內容（如人名、地點、事件）做回應。
2. 回答要像是一個通用的籤詩，讓人覺得「好像有道理又好像在胡說八道」。
3. 字數限制：15個字以內。越短越有力越好。
4. 不要解釋原因，直接給結果。
${isFollowUp ? '使用者對答案不滿意，請給出更不耐煩、更隨便的一句廢話。' : ''}
回答不需要 Markdown 標題，直接給出語句。`;

  // Construct User Prompt - Simplified to reduce context bias
  const userContent = `User Question: ${userData.question || '...'}
(Please give a random cynical answer)`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContent,
      config: {
        systemInstruction: systemPrompt,
        temperature: 1.6, // Higher temperature for more randomness
      },
    });

    return response.text || "仙女無言以對。";

  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
};