"use client";
import {
  LoadingIndicator,
  TextOutput,
  generateScenario,
  useGame,
} from "./core";
import { VStack } from "../stack";
import { ContextHeader } from "@/app/ui/context-header";
import { Choice } from "@/app/ui/choices";
import { useState } from "react";

interface GameContainerProps {}

export const GameContainer: React.FC<GameContainerProps> = () => {
  const [gameState, dispatch] = useGame();
  const [nextScenarioLoading, setNextScenarioLoading] = useState(false);

  const handleChoose = async (choiceIndex: number) => {
    dispatch({ type: "SELECT_OPTION", payload: choiceIndex });
    setNextScenarioLoading(true);
    const newScenario = await generateScenario(
      gameState.scenario.id + 1,
      gameState,
    );
    if (newScenario) {
      dispatch({ type: "NEXT_SCENARIO", payload: newScenario });
      setNextScenarioLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 opacity-100 text-[9px] text-white max-w-xs leading-none">
        <ul className="flex flex-col gap-3">
          <li>{nextScenarioLoading.toString()}</li>
          <li>{JSON.stringify(gameState.scenario)}</li>
        </ul>
      </div>
      <VStack size={"lg"}>
        {/* Display past scenarios with faded text */}
        {gameState.pastScenarios.map((scenario, index) => (
          <VStack
            size={"md"}
            key={index}
            className="text-white/50"
            id={`scenario-${index}`}
          >
            <ContextHeader title="Scenario" subtitle={scenario.id.toString()} />
            <TextOutput content={scenario.content.message.content} />
            <Choice scenario={scenario} onChoose={handleChoose} />
          </VStack>
        ))}
        {/* Show current scenario */}

        <VStack size={"md"} className="text-white" id={"current-scenario"}>
          <ContextHeader
            title="Scenario"
            subtitle={gameState.scenario.id.toString()}
          />
          <TextOutput content={gameState.scenario.content.message.content} />
          {gameState.scenario.content.choices.length > 0 && (
            <Choice
              scenario={gameState.scenario}
              onChoose={handleChoose}
              current
            />
          )}
          {nextScenarioLoading && <LoadingIndicator />}
        </VStack>
      </VStack>
    </>
  );
};
