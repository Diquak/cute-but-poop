import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  ANSWER = 'ANSWER',
  FOLLOW_UP = 'FOLLOW_UP',
}

export enum FairyRole {
  CONSTIPATED = '便祕仙女',
  DIARRHEA = '拉肚子仙女',
  SMOOTH = '順暢仙女',
}

export interface UserData {
  name: string;
  birthDate: string; // YYYY-MM-DD
  question: string;
  role: FairyRole;
}

export interface ApiResponse {
  text: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}