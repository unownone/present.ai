import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import {
  GENERATE_SLIDES_SYSTEM_PROMPT,
  GENERATE_SLIDES_USER_PROMPT,
} from "@/app/utils/prompts";
import { IPPT } from "@/app/utils/types";

const modelName = "gpt-3.5-turbo-16k-0613";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IRequest {
  topic: string;
}

export async function GET(request: Request) {
  const openai = new OpenAIApi(configuration);
  let topic = "";
  try {
    const params = new URL(request.url).searchParams;
    if (!params.has("topic")) {
      throw new Error("Invalid request");
    }
    topic = params.get("topic")!;
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { data } = await openai.createChatCompletion({
    model: modelName,
    messages: [
      {
        role: "system",
        content: GENERATE_SLIDES_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: getTemplate(GENERATE_SLIDES_USER_PROMPT, {
          topic: topic,
        }),
      },
    ],
  });
  console.log(data.choices[0].message!.content);
  const ppt: IPPT = JSON.parse(data.choices[0].message!.content || "{}");

  return NextResponse.json(ppt, {
    status: 200,
  });
}

interface ITemplMap {
  [key: string]: string;
}

const getTemplate = (prompt: string, args: ITemplMap) => {
  for (const key in args) {
    prompt = prompt.replace(`{${key}}`, args[key]);
  }
  return prompt;
};
