import { UIMessage } from "@/app/stores/messages";
import { buildContextMessage, parsedChoices } from "../openai";
import { GameState } from "./core";
import OpenAI from "openai";

export type Scenario = {
  id: number;
  content: UIMessage;
  pickedChoice?: number;
};

export const createNewScenario = (id: number): Scenario => ({
  id,
  content: {
    message: {
      content: [],
      step: 0,
    },
    choices: [],
  },
});

export const updateScenarioContent = (scenario: Scenario, newContent: UIMessage): Scenario => {
  return {
    ...scenario,
    content: newContent,
  };
};

export const updateScenarioPickedChoice = (scenario: Scenario, newChoice: number): Scenario => {
  return {
    ...scenario,
    pickedChoice: newChoice,
  };
};

const contextFromGameState = (state: GameState) => {
  const MAX_CHARS_FOR_PAST_SCENARIOS = 10000;

  let context = "Here is the current state of the game:\n";

  context += `- Current player: ${JSON.stringify(state.character)}\n`;

  if (state.party.length > 1) {
    context += `- They are in a party of ${state.party.length} members.\n`;
  }

  const pastScenarios = state.pastScenarios.slice(-4);
  context +=
    "The following list of past scenarios might have been truncated to save tokens. Do not reveal this to the player, simply use it for your own information in case you find some text that is malformed.\n";
  pastScenarios.forEach((scenario) => {
    let scenarioDescription = `- Past scenario ${scenario.id}:\n   ${scenario.content.message.content}\n`;
    if (scenario.pickedChoice !== undefined) {
      const choice = scenario.content.choices[scenario.pickedChoice];
      scenarioDescription += `   ${state.character.name} chose: ${choice.text}\n`;
    }

    // If adding the scenario description makes the context too long, slice from the beginning
    if ((context + scenarioDescription).length > MAX_CHARS_FOR_PAST_SCENARIOS) {
      const overFlow = (context + scenarioDescription).length - MAX_CHARS_FOR_PAST_SCENARIOS;
      context = context.slice(overFlow);
    }
    context += scenarioDescription;
  });

  const currentScenario = state.scenario;
  context += `- Current scenario ${currentScenario.id}:\n   ${currentScenario.content.message.content}\n`;

  if (currentScenario.pickedChoice !== undefined) {
    const choice = currentScenario.content.choices[currentScenario.pickedChoice];
    context += `   ${state.character.name} chose: ${choice.text}\n`;
  } else {
    context += "   Choices:\n";
    currentScenario.content.choices.forEach((choice, index) => {
      context += `   ${index + 1}: ${choice.text}\n`;
    });
  }

  return context;
};

export const generateScenario = async (
  previous_id: number,
  state: GameState,
): Promise<Scenario> => {
  const context = contextFromGameState(state);

  const context_message = buildContextMessage(context);

  const res_message = await fetchScenario(context_message);
  const message_with_choices = parsedChoices(res_message);

  console.log(JSON.stringify(res_message, null, 2));

  const content = {
    message: {
      content: [message_with_choices.updatedMessage],
      // content: ["message_with_choices.updatedMessage"],
      // TODO: Remove this
      step: 0,
    },
    choices: message_with_choices.choices,
    // choices: [{ id: 0, text: "test" }],
  };

  return {
    id: previous_id + 1,
    content,
  };
};

export const fetchScenario = async (messages: OpenAI.ChatCompletionMessage[]) => {
  const key = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: key,
  });

  if (!openai.apiKey) {
    throw new Error("No OpenAI API key found");
  }

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  return chatCompletion;
};
