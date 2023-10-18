import { GameContainer } from "@/app/lib/engine/game-container";
import { Providers } from "./providers";

export default function Page() {
  return (
    <Providers>
      <GameContainer />
    </Providers>
  );
}
