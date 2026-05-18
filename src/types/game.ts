// Typy hry

export interface GameState {
  gameId: string;
  playerName: string;
  currentDate: Date;
  gameDay: number;
  gamePhase: 'intro' | 'campaign' | 'government' | 'parliament' | 'election' | 'diplomacy';
  isRunning: boolean;
  isPaused: boolean;
}

export interface PlayerStats {
  approvalRating: number;
  economyHealth: number;
  coalitionStability: number;
  publicMood: number;
  mediaPresure: number;
  crisisLevel: number;
  politicalPoints: number;
  publicTrust: number;
}

export interface Region {
  id: string;
  name: string;
  voterSupport: number;
  economyLevel: number;
  unemployment: number;
  protests: number;
  population: number;
}

export interface MP {
  id: string;
  name: string;
  party: string;
  region: string;
  alignment: 'government' | 'opposition';
  isPresent: boolean;
  votingBehavior: 'Za' | 'Proti' | 'Zdržal_sa' | 'Nehlasoval';
  loyalty: number; // 0-100
  scandals: string[];
}

export interface Coalition {
  parties: string[];
  stability: number;
  majoritySeats: number;
  demands: string[];
}

export interface Law {
  id: string;
  title: string;
  description: string;
  category: 'taxes' | 'social' | 'economy' | 'health' | 'education' | 'defense';
  impact: {
    economy: number;
    popularity: number;
    media: number;
  };
  status: 'draft' | 'debate' | 'voting' | 'passed' | 'rejected';
  createdDate: Date;
  votes?: {
    za: number;
    proti: number;
    zdrzal: number;
    nehlasoval: number;
  };
}

export interface MediaArticle {
  id: string;
  title: string;
  content: string;
  outlet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  impact: number;
  createdDate: Date;
  reactions: number;
  comments: string[];
}

export interface Crisis {
  id: string;
  type: 'protest' | 'scandal' | 'economy' | 'health' | 'migration' | 'coalition';
  severity: number; // 0-100
  description: string;
  affectedRegions: string[];
  createdDate: Date;
  resolved: boolean;
}

export interface GameSave {
  id: string;
  name: string;
  timestamp: Date;
  gameState: GameState;
  playerStats: PlayerStats;
  regions: Region[];
  parliament: MP[];
  coalition: Coalition;
  laws: Law[];
  media: MediaArticle[];
  crises: Crisis[];
}
