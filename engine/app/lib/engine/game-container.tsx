'use client'
import { useGame } from "./core";
import { ContinueButton, OptionInput, TextOutput } from "./primitive";

export const GameContainer: React.FC = () => {
    const [gameState, dispatch] = useGame();

    // functions to handle player input
    const handleChoose = (choice: string) => {
        console.log(`Player chose: ${choice}`);
    };

    const handleContinue = () => {
        console.log("Continue button was clicked");
    };

    return (
        <>
            <TextOutput content={gameState.scenario.message.content} />
            {gameState.scenario.choices.length > 0 ? (
                <OptionInput choices={gameState.scenario.choices.map(c => c.text)} onChoose={handleChoose} />
            ) : (
                <ContinueButton onContinue={handleContinue} />
            )}
        </>
    );
};
