import {
  Grid3X3,
  Eye,
  ListOrdered,
  Ear,
  MoveHorizontal,
  BrainCircuit,
  BookOpen
} from 'lucide-react';
import { GameMetadata, GameType } from './types';

// 基础游戏配置（不包含翻译文本）
const GAME_CONFIGS = [
  {
    id: GameType.SCHULTE,
    icon: Grid3X3,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/30",
  },
  {
    id: GameType.STROOP,
    icon: Eye,
    color: "from-rose-500 to-orange-400",
    shadow: "shadow-rose-500/30",
  },
  {
    id: GameType.SERIAL_MEMORY,
    icon: ListOrdered,
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    id: GameType.AUDITORY_ATTENTION,
    icon: Ear,
    color: "from-amber-500 to-yellow-400",
    shadow: "shadow-amber-500/30",
  },
  {
    id: GameType.MIRROR_COORDINATION,
    icon: MoveHorizontal,
    color: "from-violet-600 to-purple-400",
    shadow: "shadow-violet-600/30",
  },
  {
    id: GameType.LOGIC_CLASSIFICATION,
    icon: BrainCircuit,
    color: "from-indigo-600 to-blue-500",
    shadow: "shadow-indigo-600/30",
  },
  {
    id: GameType.CONTEXT_MEMORY,
    icon: BookOpen,
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-pink-500/30",
  }
];

// 获取翻译后的游戏数据
export const getGamesData = (t: (key: string) => string, tObj: (key: string, params?: any) => any): GameMetadata[] => {
  return GAME_CONFIGS.map(config => {
    const gameKey = config.id.toLowerCase().replace('_', '');
    const gameData = tObj(`games.${gameKey}`);

    return {
      ...config,
      title: gameData.title,
      subtitle: gameData.subtitle,
      description: gameData.description,
      duration: gameData.duration,
      benefits: gameData.benefits,
      howToPlay: gameData.howToPlay,
      science: gameData.science,
      citation: gameData.citation,
    };
  });
};