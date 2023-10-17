import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi,
} from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type Message = ChatCompletionRequestMessage;

export interface RequestParams {
  params: {
    messages: Message[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateChatCompletionResponseChoicesInner>,
) {
  const { messages } = req.body;

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 2000,
    });
    console.log(JSON.stringify(result.data, null, 2));
    return res.status(200).json(result.data.choices[0]);
  } catch (error) {
    console.log(error);
  }
}
