'use client'
import { useReducer, createContext, useContext, ReactNode } from 'react';
import { CharacterSheet } from '..';
import { INITIAL_MESSAGE, UIMessage } from '@/app/stores/messages';
import { seraphina_character_sheet } from '../characters/seraphina';

interface GameState {
    character: CharacterSheet;
    party: Array<CharacterSheet>;
    scenario: UIMessage;
}

type GameAction =
    | { type: "CREATE_CHARACTER"; payload: CharacterSheet }
    | { type: "ADD_MEMBER_TO_PARTY"; payload: CharacterSheet }
    | { type: "START_SCENARIO"; payload: UIMessage };

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'CREATE_CHARACTER': {
            return { ...state, character: action.payload };
        }
        case 'ADD_MEMBER_TO_PARTY':
            const newParty = [...state.party, action.payload];
            return { ...state, party: newParty };
        case 'START_SCENARIO':
            return { ...state, scenario: action.payload };
        default:
            return state;
    }
};

const startState: GameState = {
    character: seraphina_character_sheet,
    party: [seraphina_character_sheet],
    scenario: INITIAL_MESSAGE,
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
