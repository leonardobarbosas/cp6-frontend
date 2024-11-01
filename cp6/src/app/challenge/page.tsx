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
  });

  return (
    <div className="challenge-container">
      <h1>Desafios</h1>
      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div key={challenge.$id}>
            <h2>{challenge.nome}</h2>
            <p>{challenge.nota}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
