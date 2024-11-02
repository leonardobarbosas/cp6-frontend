"use client";

import { useEffect, useState } from "react";
import { TipoCheckpoint } from "@/types";
import Link from "next/link";

export default function Checkpoints() {
  const [checkpoint, setCheckpoint] = useState<TipoCheckpoint[]>([]);

  const chamadaDaApi = async () => {
    const response = await fetch("/api/base-checkpoints");
    const dados = await response.json();
    setCheckpoint(dados);
  };

  useEffect(() => {
    chamadaDaApi();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/base-checkpoints/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("O checkpoint foi excluído com sucesso!");
        chamadaDaApi();
      }
    } catch (error) {
      console.error("Falha ao realizar a exclusão do checkpoint.", error);
    }
  };

  return (
    <div className="checkpoint-container flex flex-col w-full h-80vh items-center justify-around">
      <h1 className="checkpoint-container-h1 text-5xl">Checkpoints</h1>
      <div className="checkpoint-list w-full h-1/2 flex items-center justify-center gap-4">
        {checkpoint.map((checkpoint) => (
          <div
            key={checkpoint.$id}
            className="flex flex-col items-center justify-around h-full bg-back rounded-lg shadow-lg w-64"
          >
            <h2>Nome: {checkpoint.nome}</h2>
            <p>Data: {new Date(checkpoint.data).toLocaleDateString()}</p>
            <p>Feedback: {checkpoint.feedback}</p>
            <p>Nota: {checkpoint.nota}</p>

            <div className="gs-list-item-actions w-full flex justify-around">
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href={`/checkpoints/${checkpoint.$id}`}
              >
                Editar
              </Link>
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href="#"
                onClick={() => handleDelete(checkpoint.$id)}
              >
                Excluir
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/checkpoints/cad-checkpoint"
        className="hover:t-color hover:text-lg transition-all duration-200 ease-in-out"
      >
        Cadastrar novo Checkpoint
      </Link>
    </div>
  );
}
