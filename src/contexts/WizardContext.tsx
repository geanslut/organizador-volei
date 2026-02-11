import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Player {
  id: string;
  name: string;
  tier: 'A' | 'B' | 'C';
}

export interface Team {
  id: number;
  name: string;
  players: Player[];
}

interface WizardState {
  step: number;
  players: Player[];
  selectedProfessionals: string[];
  selectedIntermediates: string[];
  teams: Team[];
  reserves: Player[];
  numTeams: number;
}

type WizardAction =
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'TOGGLE_PROFESSIONAL'; payload: string }
  | { type: 'TOGGLE_INTERMEDIATE'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GENERATE_TEAMS' }
  | { type: 'RESET' }
  | { type: 'REDO_DRAW' }
  | { type: 'REMOVE_PLAYER'; payload: string };

const initialState: WizardState = {
  step: 1,
  players: [],
  selectedProfessionals: [],
  selectedIntermediates: [],
  teams: [],
  reserves: [],
  numTeams: 0,
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_PLAYERS': {
      const totalPlayers = action.payload.length;
      const numTeams = Math.floor(totalPlayers / 5);
      const remainder = totalPlayers % 5;
      const actualTeams = remainder >= 4 ? numTeams + 1 : numTeams;
      
      return {
        ...state,
        players: action.payload,
        numTeams: actualTeams,
        selectedProfessionals: [],
        selectedIntermediates: [],
      };
    }

    case 'REMOVE_PLAYER': {
      const newPlayers = state.players.filter(p => p.id !== action.payload);
      const totalPlayers = newPlayers.length;
      const numTeams = Math.floor(totalPlayers / 5);
      const remainder = totalPlayers % 5;
      const actualTeams = remainder >= 4 ? numTeams + 1 : numTeams;
      
      return {
        ...state,
        players: newPlayers,
        numTeams: actualTeams,
        selectedProfessionals: state.selectedProfessionals.filter(id => id !== action.payload),
        selectedIntermediates: state.selectedIntermediates.filter(id => id !== action.payload),
      };
    }

    case 'TOGGLE_PROFESSIONAL': {
      const isSelected = state.selectedProfessionals.includes(action.payload);
      let newSelected: string[];

      if (isSelected) {
        newSelected = state.selectedProfessionals.filter(id => id !== action.payload);
      } else {
        if (state.selectedProfessionals.length < state.numTeams) {
          newSelected = [...state.selectedProfessionals, action.payload];
        } else {
          return state;
        }
      }

      return {
        ...state,
        selectedProfessionals: newSelected,
      };
    }

    case 'TOGGLE_INTERMEDIATE': {
      const isSelected = state.selectedIntermediates.includes(action.payload);
      let newSelected: string[];

      if (isSelected) {
        newSelected = state.selectedIntermediates.filter(id => id !== action.payload);
      } else {
        if (state.selectedIntermediates.length < state.numTeams) {
          newSelected = [...state.selectedIntermediates, action.payload];
        } else {
          return state;
        }
      }

      return {
        ...state,
        selectedIntermediates: newSelected,
      };
    }

    case 'NEXT_STEP': {
      return {
        ...state,
        step: state.step + 1,
      };
    }

    case 'PREV_STEP': {
      return {
        ...state,
        step: state.step - 1,
      };
    }

    case 'GENERATE_TEAMS': {
      // Atualizar tiers dos jogadores
      const updatedPlayers = state.players.map(player => {
        if (state.selectedProfessionals.includes(player.id)) {
          return { ...player, tier: 'A' as const };
        }
        if (state.selectedIntermediates.includes(player.id)) {
          return { ...player, tier: 'B' as const };
        }
        return { ...player, tier: 'C' as const };
      });

      // Separar jogadores por tier e embaralhar todos para garantir aleatoriedade
      const tierA = shuffleArray(updatedPlayers.filter(p => p.tier === 'A'));
      const tierB = shuffleArray(updatedPlayers.filter(p => p.tier === 'B'));
      const tierC = shuffleArray(updatedPlayers.filter(p => p.tier === 'C'));

      // Criar times vazios
      const teams: Team[] = Array.from({ length: state.numTeams }, (_, i) => ({
        id: i + 1,
        name: `Time ${i + 1}`,
        players: [],
      }));

      // Distribuir Tier A (1 por time)
      tierA.forEach((player, index) => {
        teams[index].players.push(player);
      });

      // Distribuir Tier B (1 por time)
      tierB.forEach((player, index) => {
        teams[index].players.push(player);
      });

      // Distribuir Tier C até completar 5 jogadores por time
      let tierCIndex = 0;
      for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
        while (teams[teamIndex].players.length < 5 && tierCIndex < tierC.length) {
          teams[teamIndex].players.push(tierC[tierCIndex]);
          tierCIndex++;
        }
      }

      // Jogadores restantes vão para reservas
      const reserves = tierC.slice(tierCIndex);

      return {
        ...state,
        teams,
        reserves,
        players: updatedPlayers,
        step: 4,
      };
    }

    case 'REDO_DRAW': {
      // Re-embaralhar TODOS os tiers (Capitães entre si, Vices entre si, Resto entre si)
      const tierA = shuffleArray(state.players.filter(p => p.tier === 'A'));
      const tierB = shuffleArray(state.players.filter(p => p.tier === 'B'));
      const tierC = shuffleArray(state.players.filter(p => p.tier === 'C'));

      const teams: Team[] = Array.from({ length: state.numTeams }, (_, i) => ({
        id: i + 1,
        name: `Time ${i + 1}`,
        players: [],
      }));

      tierA.forEach((player, index) => {
        teams[index].players.push(player);
      });

      tierB.forEach((player, index) => {
        teams[index].players.push(player);
      });

      let tierCIndex = 0;
      for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
        while (teams[teamIndex].players.length < 5 && tierCIndex < tierC.length) {
          teams[teamIndex].players.push(tierC[tierCIndex]);
          tierCIndex++;
        }
      }

      const reserves = tierC.slice(tierCIndex);

      return {
        ...state,
        teams,
        reserves,
      };
    }

    case 'RESET': {
      return initialState;
    }

    default:
      return state;
  }
}

interface WizardContextType {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
