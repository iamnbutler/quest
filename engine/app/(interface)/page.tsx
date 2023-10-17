'use client'
import { GameProvider } from "@/app/lib/engine/core";
import { GameContainer } from "@/app/lib/engine/game-container";

const App: React.FC = () => {
    const onChoiceSelect = (choice: string) => {
        // Do something when a choice is selected if needed
        console.log(`Choice selected: ${choice}`);
    };

    return (
        <GameProvider>
            <GameContainer onChoiceSelect={onChoiceSelect} />
        </GameProvider>
    );
};

export default App;
