'use client'
import { INITIAL_MESSAGE } from "@/app/stores/messages";
import { useGame } from "./core";
import { ContinueButton, OptionInput, TextOutput } from "./primitive";
import { VStack } from "../stack";

interface GameContainerProps {
    onChoiceSelect: (choice: string) => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ onChoiceSelect }) => {
    const [gameState, dispatch] = useGame();

    // Move to the next scenario
    const moveToNextScenario = () => {
        const newScenario = INITIAL_MESSAGE; // Make the decision to get new scenario based on the game logic
        dispatch({ type: 'START_SCENARIO', payload: newScenario });
    };

    // Handle player input
    const handleChoose = (choice: string) => {
        // Call onChoiceSelect from parent to notify about chosen option
        onChoiceSelect(choice);
        // Move to next scenario
        moveToNextScenario();
    };

    const handleContinue = () => {
        // Move to next scenario
        moveToNextScenario();
    };

    return (
        <VStack size={'lg'}>
            {/* Display past scenarios with faded text */}
            {gameState.pastScenarios.map((scenario, index) => (
                <VStack size={'md'} key={index} className="text-white/50 border-b border-white/10">
                    <TextOutput content={scenario.message.content} />
                    <OptionInput choices={scenario.choices.map(c => c.text)} onChoose={() => null} />
                </VStack>
            ))}
            {/* Show current scenario */}
            <VStack size={'md'} className="text-white">
                <TextOutput content={gameState.scenario.message.content} />
                {gameState.scenario.choices.length > 0 ? (
                    <OptionInput choices={gameState.scenario.choices.map(c => c.text)} onChoose={handleChoose} />
                ) : (
                    <ContinueButton onContinue={handleContinue} />
                )}
            </VStack>
        </VStack>
    );
};
