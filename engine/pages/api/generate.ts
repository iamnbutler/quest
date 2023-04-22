import { Configuration, OpenAIApi } from "openai";
import { Prompt } from "../../app/prompt";
import { NextRequest, NextResponse } from "next/server";

// Initialize OpenAI API configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Handler function for the API endpoint.
 */
export default async function handleAPIRequest(
    req: NextRequest,
    res: NextResponse
) {
    // Ensure that the request object is not null
    if (!req || req.body === null) {
        new Response("No request object", { status: 500 });
        return
    }

    console.log(JSON.stringify(req.body))

    // Parse the input prompt from the request body
    const inputPrompt: Prompt = req.body.prompt || [];

    // Check if the OpenAI API key is configured
    if (!configuration.apiKey) {
        new Response("OpenAI API key not configured", { status: 500 });
        return
    }

    try {
        // Call the OpenAI API to create a chat completion
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: inputPrompt,
        });

        // Return the response from the API
        return new Response(
            JSON.stringify(completion.data.choices[0].message),
            { status: 200 }
        );
    } catch (error) {
        // Handle errors from the OpenAI API
        if (error.response) {
            console.error(error.response.status, error.response.data);
            return res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            return new Response("An error occurred during your request.", {
                status: 500,
            });
        }
    }
}
