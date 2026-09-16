"use client";

import { useState } from "react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function MiaMiniChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSendMessage() {
    const text = message.trim();

    if (!text || isLoading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
      const errorData = await response.json();

  throw new Error(
    errorData.reply || "Erro ao enviar mensagem."
  );
}

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: "Desculpe, não consegui responder agora.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-gray-500 bg-[#111111] shadow-xl">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        {/* Lado esquerdo */}
        <div className="flex items-center gap-3">
          <button type="button" className="text-xl text-white">
            ←
          </button>

          <Image
            src="/img/mia.jpeg"
            alt="Avatar da Mia"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            style={{ objectPosition: "center 0%" }}
          />

          <div>
            <h2 className="text-sm font-semibold text-white">Mia</h2>

            <p className="text-xs text-gray-300">
              Como posso ajudar?
            </p>
          </div>
        </div>

        {/* Lado direito */}
        <div className="flex items-center gap-3">
          <button type="button" className="text-xl text-white">
            ↗
          </button>

          <button type="button" className="text-xl text-white">
            ×
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-300">
            Escolha uma opção abaixo para ver dicas rápidas ou digite sua
            pergunta.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-gray-800 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-300">
                Mia está digitando...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campo de mensagem */}
      <div className="flex items-center gap-2 border-t border-gray-700 p-3">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          disabled={isLoading}
          className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-400 disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
          className="rounded-lg px-3 py-2 text-white disabled:opacity-50"
        >
          ➤
        </button>
      </div>
    </div>
  );
}