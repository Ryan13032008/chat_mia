"use client";

import { useState } from "react";
import Image from "next/image";

import { MiaMiniChat } from "./MiaMiniChat";


export function MiaFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <MiaMiniChat />}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fechar chat da Mia" : "Abrir chat da Mia"}
        className="
          fixed bottom-6 right-6 z-50
          h-14 w-14 rounded-full
          overflow-hidden
          shadow-lg
          flex items-center justify-center
          transition-all duration-200 ease-in-out
          hover:scale-110 hover:shadow-xl
        "
      >
        <Image
          src="/img/mia.jpeg"
          alt="Avatar da Mia"
          width={56}
          height={56}
          className="h-full w-full object-cover rounded-full"
          style={{ objectPosition: "center 0%" }}
        />
      </button>
    </>
  );
}