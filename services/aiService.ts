import { ROLE_DESCRIPTIONS } from '../constants';
import { UserData } from '../types';

interface AIRequestParams {
  userData: UserData;
  isFollowUp: boolean;
}

const API_KEY = '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';

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
  const roleDescription = ROLE_DESCRIPTIONS[userData.role];

  // System Prompt
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

  // User Prompt
  const userContent = `User Question: ${userData.question || '...'}
(Please give a random cynical answer)`;

  try {
    // Check if window is defined (for build time safety)
    const referer = typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000';

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": referer, 
        "X-Title": "Cynical Fairy Book"
      },
      body: JSON.stringify({
        model: "google/gemma-3n-e2b-it:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ]
      })
    });

    if (!response.ok) {
      // Try to parse the error message from OpenRouter
      const errorBody = await response.text();
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorBody);
        if (errorJson.error && errorJson.error.message) {
          // OpenRouter specific error message
          errorMsg = `${response.status} - ${errorJson.error.message}`;
        } else if (errorJson.error) {
           errorMsg = `${response.status} - ${JSON.stringify(errorJson.error)}`;
        }
      } catch (e) {
        // Fallback to text body or status text
        if (errorBody && errorBody.length < 100) errorMsg = `${response.status} - ${errorBody}`;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    // Check if choices array exists and has content
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
        throw new Error("API returned no answer");
    }

    const answer = data.choices[0].message.content;
    return answer || "仙女無言以對。";

  } catch (error: any) {
    console.error('AI Service Error:', error);
    // Re-throw the error with the message so App.tsx can display it
    throw new Error(error.message || "Unknown Network Error");
  }
};