import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const runtime = "nodejs";

const MODEL_NAME = "gemini-2.5-flash";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return NextResponse.json(
        { reply: "Envie uma mensagem válida." },
        { status: 400 }
      );
    }

    const messages: Message[] = body.messages.filter(
      (message: { role?: string; content?: string }) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    );

    if (messages.length === 0) {
      return NextResponse.json(
        { reply: "Não foi encontrada nenhuma mensagem válida." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) {
      return NextResponse.json(
        { reply: "Envie uma mensagem para a Mia." },
        { status: 400 }
      );
    }

    // Chave da API configurada diretamente no código
    const apiKey = "AQ.Ab8RN6Lg0pvHRq5rkBN8TIK0QlflbJz9hPhNREOKikbj7HM7rQ";

    const ai = new GoogleGenAI({
      apiKey,
    });

    const history = messages
      .map((message) => {
        const role = message.role === "user" ? "Usuário" : "Assistente";
        return `${role}: ${message.content}`;
      })
      .join("\n");

    const prompt = `
Você é a Mia, uma assistente virtual amigável e útil.

Responda às perguntas do usuário de forma clara, natural e objetiva.
Você pode conversar sobre diferentes assuntos e não precisa se limitar ao
projeto Mútua 360.

Histórico da conversa:
${history}

Mensagem atual do usuário:
${lastUserMessage.content}

Responda somente com a mensagem que deve ser exibida no chat.
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    const reply = response.text?.trim();

    if (!reply) {
      return NextResponse.json(
        { reply: "Não consegui gerar uma resposta." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro na API /api/chat:", error);

    return NextResponse.json(
      {
        reply:
          error instanceof Error
            ? error.message
            : "Erro desconhecido no servidor.",
      },
      { status: 500 }
    );
  }
}