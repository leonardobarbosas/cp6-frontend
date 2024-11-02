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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/base-challenge/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Challenge foi excluído com sucesso!");
        chamadaDaApi();
      }
    } catch (error) {
      console.error("Falha ao realizar a exclusão do challenge.", error);
    }
  };

  return (
    <div className="challenge-container flex flex-col h-80vh justify-around items-center">
      <h1 className="text-5xl">Challenge Sprints</h1>
      <div className="challenge-list  w-full h-1/2 flex items-center justify-center gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.$id}
            className="flex flex-col items-center justify-around h-full bg-back rounded-lg shadow-lg w-60"
          >
            <h2>Nome: {challenge.nome}</h2>
            <p>Nota: {challenge.nota}</p>
            <div className="w-full flex justify-around">
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href={`/challenge/${challenge.$id}`}
              >
                Editar
              </Link>
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href="#"
                onClick={() => handleDelete(challenge.$id)}
              >
                Excluir
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/challenge/cad-challenge"
        className="hover:t-color hover:text-lg transition-all duration-200 ease-in-out"
      >
        Cadastrar nova Sprint
      </Link>
    </div>
  );
}
