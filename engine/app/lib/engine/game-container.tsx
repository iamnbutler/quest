'use client'
import { INITIAL_MESSAGE } from "@/app/stores/messages";
import { useGame } from "./core";
import { ContinueButton, OptionInput, TextOutput } from "./primitive";

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
        <div className="flex flex-col gap-6">
            {/* Display past scenarios with faded text */}
            {gameState.pastScenarios.map((scenario, index) => (
                <div key={index} className="text-white/50 flex flex-col gap-3 border-b border-white/10">
                    <TextOutput content={scenario.message.content} />
                    <OptionInput choices={scenario.choices.map(c => c.text)} onChoose={() => null} />
                </div>
            ))}
            {/* Show current scenario */}
            <div className="text-white flex flex-col gap-3">
                <TextOutput content={gameState.scenario.message.content} />
                {gameState.scenario.choices.length > 0 ? (
                    <OptionInput choices={gameState.scenario.choices.map(c => c.text)} onChoose={handleChoose} />
                ) : (
                    <ContinueButton onContinue={handleContinue} />
                )}
            </div>
        </div>
    );
};
