import { FairyRole } from './types';

// Role Descriptions (System Prompts)
export const ROLE_DESCRIPTIONS: Record<FairyRole, string> = {
  [FairyRole.CONSTIPATED]: '想說說不出口、積壓已久、內斂、糾結。講話含蓄、點到為止。使用隱喻，帶有一點被動攻擊（Passive-aggressive）。像是心裡有很多話，但最後只冷冷吐出一句。',
  [FairyRole.DIARRHEA]: '直腸子、控制不住、宣洩、激動、混亂。說話非常直接（Brutal Honesty），不留情面。語速快，帶有驚嘆號。內容落落長，像是一口氣把怨氣吐完。',
  [FairyRole.SMOOTH]: '通體舒暢、邏輯清晰、冷靜、也是最「正常」的厭世。理智的瘋子，用最冷靜的語氣講最厭世的話。結構完整，富有哲理，像是看透紅塵的智者。有一種「我早就告訴過你」的優越感。',
};

// Marquee Texts
export const MARQUEE_TEXTS = [
  "他到底喜不喜歡我？",
  "工作好累我想離職...",
  "午餐要吃什麼？",
  "我是不是真的很廢？",
  "為什麼薪水這麼少？",
  "貓咪是不是看不起我？",
  "活著的意義是什麼？",
  "要不要傳訊息給前任？"
];

// Fallback Messages
export const ERROR_MESSAGE = "仙女去上廁所了，連訊號都便秘。請稍後再試。";