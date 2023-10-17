'use client'
import { useReducer, createContext, useContext, ReactNode } from 'react';
import { CharacterSheet } from '..';
import { INITIAL_MESSAGE } from '@/app/stores/messages';
import { seraphina_character_sheet } from '../characters/seraphina';
import { Scenario, createNewScenario, updateScenarioPickedChoice } from './scenario';
export * from './scenario';
export * from './primitive';
export * from './game-container';

export interface GameState {
    character: CharacterSheet;
    party: Array<CharacterSheet>;
    scenario: Scenario;
    pastScenarios: Scenario[];
}

type GameAction =
    | { type: "NEXT_SCENARIO"; }
    | { type: 'SELECT_OPTION'; payload: number };

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'NEXT_SCENARIO':
            const newScenario = createNewScenario(state.scenario.id + 1);
            const pastScenarios = [...state.pastScenarios, state.scenario];
            return { ...state, scenario: newScenario, pastScenarios };
        case 'SELECT_OPTION':
            const updatedScenario = updateScenarioPickedChoice(state.scenario, action.payload);
            return { ...state, scenario: updatedScenario };
        default:
            return state;
    }
};

const startState: GameState = {
    character: seraphina_character_sheet,
    party: [seraphina_character_sheet],
    scenario: { id: 0, content: INITIAL_MESSAGE },
    pastScenarios: [],
};

const GameContext = createContext<[GameState, React.Dispatch<GameAction>] | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, startState);

    return (
        <GameContext.Provider value={[state, dispatch]}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
