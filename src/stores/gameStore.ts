import { create } from 'zustand';
import { GameState, PlayerStats, Region, MP, Coalition, Law, MediaArticle, Crisis } from '@/types/game';

interface GameStore {
  // Game State
  gameState: GameState | null;
  playerStats: PlayerStats | null;
  regions: Region[];
  parliament: MP[];
  coalition: Coalition | null;
  laws: Law[];
  mediaArticles: MediaArticle[];
  crises: Crisis[];

  // Actions
  initializeGame: (playerName: string) => void;
  updateGameDay: () => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
  updatePlayerStats: (stats: Partial<PlayerStats>) => void;
  addMediaArticle: (article: MediaArticle) => void;
  addCrisis: (crisis: Crisis) => void;
  updateRegion: (regionId: string, updates: Partial<Region>) => void;
  updateMPVote: (mpId: string, vote: MP['votingBehavior']) => void;
  addLaw: (law: Law) => void;
  loadGame: (save: any) => void;
  saveGame: (name: string) => void;
  reset: () => void;
}

const initialGameState: GameState = {
  gameId: Math.random().toString(36).substr(2, 9),
  playerName: '',
  currentDate: new Date(2024, 3, 11), // 11.4.2024
  gameDay: 1,
  gamePhase: 'intro',
  isRunning: false,
  isPaused: false,
};

const initialPlayerStats: PlayerStats = {
  approvalRating: 45,
  economyHealth: 55,
  coalitionStability: 60,
  publicMood: 50,
  mediaPresure: 40,
  crisisLevel: 35,
  politicalPoints: 1000,
  publicTrust: 50,
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  playerStats: null,
  regions: [],
  parliament: [],
  coalition: null,
  laws: [],
  mediaArticles: [],
  crises: [],

  initializeGame: (playerName: string) => {
    set({
      gameState: {
        ...initialGameState,
        playerName,
        gameId: Math.random().toString(36).substr(2, 9),
      },
      playerStats: { ...initialPlayerStats },
      regions: createRegions(),
      parliament: createParliament(),
      coalition: createCoalition(),
      laws: [],
      mediaArticles: [],
      crises: [],
    });
  },

  updateGameDay: () => {
    set((state) => {
      if (!state.gameState) return state;
      const newDate = new Date(state.gameState.currentDate);
      newDate.setDate(newDate.getDate() + 1);
      return {
        gameState: {
          ...state.gameState,
          currentDate: newDate,
          gameDay: state.gameState.gameDay + 1,
        },
      };
    });
  },

  setGamePhase: (phase: GameState['gamePhase']) => {
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, gamePhase: phase } : null,
    }));
  },

  updatePlayerStats: (stats: Partial<PlayerStats>) => {
    set((state) => ({
      playerStats: state.playerStats ? { ...state.playerStats, ...stats } : null,
    }));
  },

  addMediaArticle: (article: MediaArticle) => {
    set((state) => ({
      mediaArticles: [article, ...state.mediaArticles],
    }));
  },

  addCrisis: (crisis: Crisis) => {
    set((state) => ({
      crises: [crisis, ...state.crises],
    }));
  },

  updateRegion: (regionId: string, updates: Partial<Region>) => {
    set((state) => ({
      regions: state.regions.map((r) => (r.id === regionId ? { ...r, ...updates } : r)),
    }));
  },

  updateMPVote: (mpId: string, vote: MP['votingBehavior']) => {
    set((state) => ({
      parliament: state.parliament.map((mp) => (mp.id === mpId ? { ...mp, votingBehavior: vote } : mp)),
    }));
  },

  addLaw: (law: Law) => {
    set((state) => ({
      laws: [...state.laws, law],
    }));
  },

  loadGame: (save: any) => {
    set({
      gameState: save.gameState,
      playerStats: save.playerStats,
      regions: save.regions,
      parliament: save.parliament,
      coalition: save.coalition,
      laws: save.laws,
      mediaArticles: save.media,
      crises: save.crises,
    });
  },

  saveGame: (name: string) => {
    set((state) => {
      const save = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        timestamp: new Date(),
        gameState: state.gameState,
        playerStats: state.playerStats,
        regions: state.regions,
        parliament: state.parliament,
        coalition: state.coalition,
        laws: state.laws,
        media: state.mediaArticles,
        crises: state.crises,
      };
      const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
      saves.push(save);
      localStorage.setItem('gameSaves', JSON.stringify(saves));
      return {};
    });
  },

  reset: () => {
    set({
      gameState: null,
      playerStats: null,
      regions: [],
      parliament: [],
      coalition: null,
      laws: [],
      mediaArticles: [],
      crises: [],
    });
  },
}));

// Pomocné funkcie
function createRegions(): Region[] {
  return [
    { id: '1', name: 'Bratislava', voterSupport: 55, economyLevel: 80, unemployment: 5, protests: 2, population: 475000 },
    { id: '2', name: 'Trnava', voterSupport: 48, economyLevel: 65, unemployment: 8, protests: 3, population: 554000 },
    { id: '3', name: 'Trenčín', voterSupport: 52, economyLevel: 60, unemployment: 10, protests: 4, population: 597000 },
    { id: '4', name: 'Nitra', voterSupport: 50, economyLevel: 58, unemployment: 12, protests: 5, population: 691000 },
    { id: '5', name: 'Žilina', voterSupport: 49, economyLevel: 62, unemployment: 11, protests: 4, population: 718000 },
    { id: '6', name: 'Banská Bystrica', voterSupport: 45, economyLevel: 55, unemployment: 14, protests: 6, population: 659000 },
    { id: '7', name: 'Prešov', voterSupport: 47, economyLevel: 52, unemployment: 15, protests: 7, population: 823000 },
    { id: '8', name: 'Košice', voterSupport: 46, economyLevel: 58, unemployment: 13, protests: 6, population: 800000 },
  ];
}

function createParliament(): MP[] {
  const parties = ['SOCDEM', 'Progresívne Slovensko', 'SaS', 'KDH', 'Spolu', 'Nezaradení', 'OĽaNO'];
  const regions = ['Bratislava', 'Trnava', 'Trenčín', 'Nitra', 'Žilina', 'Banská Bystrica', 'Prešov', 'Košice'];
  const mps: MP[] = [];

  // SOCDEM coalition - 76 seats (majority)
  for (let i = 0; i < 40; i++) {
    mps.push({
      id: `mp-${mps.length}`,
      name: `Poslanec SOCDEM ${i + 1}`,
      party: 'SOCDEM',
      region: regions[Math.floor(Math.random() * regions.length)],
      alignment: 'government',
      isPresent: true,
      votingBehavior: 'Za',
      loyalty: 75 + Math.random() * 25,
      scandals: [],
    });
  }

  // Coalition partners
  for (let i = 0; i < 20; i++) {
    mps.push({
      id: `mp-${mps.length}`,
      name: `Poslanec PS ${i + 1}`,
      party: 'Progresívne Slovensko',
      region: regions[Math.floor(Math.random() * regions.length)],
      alignment: 'government',
      isPresent: true,
      votingBehavior: 'Za',
      loyalty: 70 + Math.random() * 30,
      scandals: [],
    });
  }

  for (let i = 0; i < 16; i++) {
    mps.push({
      id: `mp-${mps.length}`,
      name: `Poslanec SaS ${i + 1}`,
      party: 'SaS',
      region: regions[Math.floor(Math.random() * regions.length)],
      alignment: 'government',
      isPresent: true,
      votingBehavior: 'Za',
      loyalty: 65 + Math.random() * 35,
      scandals: [],
    });
  }

  // Opposition
  const oppositionCount = 150 - mps.length;
  for (let i = 0; i < oppositionCount; i++) {
    const oppParty = parties[4 + Math.floor(Math.random() * 3)];
    mps.push({
      id: `mp-${mps.length}`,
      name: `Poslanec ${oppParty} ${i + 1}`,
      party: oppParty,
      region: regions[Math.floor(Math.random() * regions.length)],
      alignment: 'opposition',
      isPresent: Math.random() > 0.2,
      votingBehavior: 'Proti',
      loyalty: 40 + Math.random() * 40,
      scandals: [],
    });
  }

  return mps;
}

function createCoalition(): Coalition {
  return {
    parties: ['SOCDEM', 'Progresívne Slovensko', 'SaS'],
    stability: 75,
    majoritySeats: 76,
    demands: [],
  };
}
