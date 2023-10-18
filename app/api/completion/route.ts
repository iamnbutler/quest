import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: NextRequest) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!configuration.apiKey) {
      throw new Error("No OpenAI API key found");
    }

    const openai = new OpenAIApi(configuration);

    const { messages } = await request.json();

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    return new NextResponse(JSON.stringify(chatCompletion.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
