"use client";

import { useEffect, useState } from "react";
import { TipoChallenge } from "@/types";
import Link from "next/link";

export default function Challenge() {
  const [challenges, setChallenges] = useState<TipoChallenge[]>([]);

  const chamadaDaApi = async () => {
    const response = await fetch("/api/base-challenge");
    const dados = await response.json();
    setChallenges(dados);
  };

  useEffect(() => {
    chamadaDaApi();
  }, []);

  return (
    <div className="challenge-container flex flex-col h-80vh justify-center items-center">
      <h1>CHALLENGE</h1>
      <div className="challenge-list  w-full h-1/2 flex items-center justify-center gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.$id}
            className="flex flex-col items-center justify-around h-full bg-back rounded-lg shadow-lg w-60"
          >
            <h2>{challenge.nome}</h2>
            <p>{challenge.nota}</p>
          </div>
        ))}
      </div>
      <Link href="/challenge/cad-challenge">Cadastrar nova Sprint</Link>
    </div>
  );
}
