import React from 'react';

export enum GameType {
  SCHULTE = 'SCHULTE',
  STROOP = 'STROOP',
  SERIAL_MEMORY = 'SERIAL_MEMORY',
  AUDITORY_ATTENTION = 'AUDITORY_ATTENTION',
  MIRROR_COORDINATION = 'MIRROR_COORDINATION',
  LOGIC_CLASSIFICATION = 'LOGIC_CLASSIFICATION',
  CONTEXT_MEMORY = 'CONTEXT_MEMORY',
}

export interface GameMetadata {
  id: GameType;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: React.ElementType;
  color: string; // Tailwind gradient classes
  shadow: string; // Tailwind shadow color
  benefits: string[];
  howToPlay: string[];
  science: string;
  citation: string;
}

export interface GameSessionProps {
  onComplete: (score: number, data?: any) => void;
  onExit: () => void;
}

export interface LogicQuestion {
  item: string;
  correctCategory: string;
  options: string[];
}

export interface ContextScenario {
  items: string[];
  theme?: string;
}