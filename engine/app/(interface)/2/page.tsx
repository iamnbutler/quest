import { GameProvider } from "@/app/lib/engine/core";
import { GameContainer } from "@/app/lib/engine/game-container";

const App: React.FC = () => {
    return (
        <GameProvider>
            <GameContainer />
        </GameProvider>
    );
};

export default App;
