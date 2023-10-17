'use client'
import { INITIAL_MESSAGE } from "@/app/stores/messages";
import { useGame } from "./core";
import { ContinueButton, OptionInput, TextOutput } from "./primitive";
import { VStack } from "../stack";
import { ContextHeader } from "@/app/ui/context-header";
import { Choice } from "@/app/ui/choices";

interface GameContainerProps {
}

export const GameContainer: React.FC<GameContainerProps> = () => {
    const [gameState, dispatch] = useGame();

    // Move to the next scenario
    const moveToNextScenario = () => {
        const newScenario = { id: gameState.scenario.id + 1, content: INITIAL_MESSAGE };
        dispatch({ type: 'START_SCENARIO', payload: newScenario });
    };

    // Handle player input
    const handleChoose = (choice: string, choiceIndex: number) => {
        dispatch({ type: 'SELECT_OPTION', payload: choiceIndex });
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
                    <Choice scenario={scenario} onChoose={handleChoose} />
                </VStack>
            ))}
            {/* Show current scenario */}
            <VStack size={'md'} className="text-white">
                <ContextHeader title="Scenario" subtitle={gameState.scenario.id.toString()} />
                <TextOutput content={gameState.scenario.content.message.content} />
                {gameState.scenario.content.choices.length > 0 ?
                    (
                        <Choice scenario={gameState.scenario} onChoose={handleChoose} current />
                    )
                    : (
                        <ContinueButton onContinue={handleContinue} />
                    )}
            </VStack>
        </VStack>
    );
};
