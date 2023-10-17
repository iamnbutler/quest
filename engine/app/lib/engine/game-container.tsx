'use client'
import { INITIAL_MESSAGE } from "@/app/stores/messages";
import { useGame } from "./core";
import { ContinueButton, OptionInput, TextOutput } from "./primitive";
import { VStack } from "../stack";
import { ContextHeader } from "@/app/ui/context-header";

interface GameContainerProps {
    onChoiceSelect: (choice: string) => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ onChoiceSelect }) => {
    const [gameState, dispatch] = useGame();

    // Move to the next scenario
    const moveToNextScenario = () => {
        const newScenario = { id: gameState.scenario.id + 1, content: INITIAL_MESSAGE };
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
                <VStack size={'md'} key={index} className="text-white/50">
                    <ContextHeader title="Scenario" subtitle={scenario.id.toString()} />
                    <TextOutput content={scenario.content.message.content} />
                    <OptionInput choices={scenario.content.choices.map(c => c.text)} onChoose={() => null} />
                </VStack>
            ))}
            {/* Show current scenario */}
            <VStack size={'md'} className="text-white">
                <ContextHeader title="Scenario" subtitle={gameState.scenario.id.toString()} />
                <TextOutput content={gameState.scenario.content.message.content} />
                {gameState.scenario.content.choices.length > 0 ? (
                    <OptionInput choices={gameState.scenario.content.choices.map(c => c.text)} onChoose={handleChoose} />
                ) : (
                    <ContinueButton onContinue={handleContinue} />
                )}
            </VStack>
        </VStack>
    );
};
