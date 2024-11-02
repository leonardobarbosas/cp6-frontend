"use client";

import { useEffect, useState } from "react";
import { TipoChallenge } from "@/types";

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
      <div className="challenge-list bg-back w-1/6 h-1/2 rounded-lg flex flex-col shadow-lg justify-center items-center">
        {challenges.map((challenge) => (
          <div
            key={challenge.$id}
            className="flex flex-col items-center justify-around h-full"
          >
            <h2>{challenge.nome}</h2>
            <p>{challenge.nota}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
