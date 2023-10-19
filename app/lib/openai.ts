import OpenAI from "openai";
import { Choice } from "@stores/messages";

export type ParsedChoicesResponse = {
  originalMessage: string;
  updatedMessage: string;
  choices: Choice[];
};

function buildSystemMessage(): OpenAI.ChatCompletionMessage {
  return {
    role: "system",
    content: "Respond to the prompt the user gives you by continuing the story.",
  };
}

function buildContextMessage(input_context: string): OpenAI.ChatCompletionMessage[] {
  const systemMessage = buildSystemMessage();

  const previousMessageContext = `
      For your reference, here is the most recent part of the story, and other important context:

      ${input_context}`;

  const finalMessageContent = `${formattingInstructions}

  ${previousMessageContext}`;

  const context = {
    role: "user",
    content: finalMessageContent,
  } as OpenAI.ChatCompletionMessage;

  const messages = [systemMessage, context];

  return messages;
}

const formattingInstructions = `Based on the current situation in the story and the choice the user provides contune the story, then provide 2-5 questions or actions the player can choose from to continue the story. List the options with numbers, followed by a colon, and then the option text.

1: Foo
2: Bar
3: Baz
...

In your reply, add a new line character at the end of each paragraph.

When two characters are talking, please use the following format:

CHARACTER_NAME: "Dialogue"
SECOND_CHARACTER_NAME: "Dialogue"

For example:

Seraphina: "Hello, World!"
Layla: "Goodbye, World!"

When two characters talk to each other ensure that the dialogue contains at least 5 lines of dialogue from each cararacter.
`;

function parsedChoices(response: OpenAI.ChatCompletion | undefined): ParsedChoicesResponse {
  if (response === undefined || response.choices === undefined) {
    throw new Error("No response from OpenAI");
  }

  const message = response.choices[0].message.content || "";

  const choicesRegex = new RegExp("\\d:\\s*(.*?)\\s*(?=\\n|$)", "g");

  const matches = Array.from(message.matchAll(choicesRegex));

  if (matches.length === 0) {
    return { originalMessage: message, updatedMessage: message, choices: [] };
  }

  const originalMessage = message;
  const updatedMessage = message.replace(choicesRegex, "").trim();

  const choices = matches.map((match, index) => {
    const id = index + 1;
    const text = match[1];
    return { id, text };
  });

  return { originalMessage, updatedMessage, choices };
}

export { buildContextMessage, parsedChoices };
