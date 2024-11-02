"use client";

import { useState } from "react";
import { TipoCheckpoint } from "@/types";
import { useRouter } from "next/navigation";
import Input from "~/components/Input/Input";

export default function CadCheckpoints() {
  const navigate = useRouter();

  const [checkpoint, setCheckpoint] = useState<TipoCheckpoint>({
    $id: 0,
    nome: "",
    feedback: "",
    data: new Date(),
    nota: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/base-checkpoints/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkpoint),
      });

      if (response.ok) {
        alert("Checkpoint cadastrado com sucesso!");
        setCheckpoint({
          $id: 0,
          nome: "",
          feedback: "",
          data: new Date(),
          nota: 0,
        });

        navigate.push("/checkpoints");
      }
    } catch (error) {
      console.error("Ocorreu um erro no cadastro", error);
    }
  };

  return (
    <div className="checkpoint-container flex flex-col h-80vh justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-1/2"
      >
        <Input
          label="Nome"
          type="text"
          id="nome"
          className="bg-white rounded-sm text-black"
          value={checkpoint.nome}
          onChange={(e) =>
            setCheckpoint({ ...checkpoint, nome: e.target.value })
          }
        />
        <Input
          label="Descrição"
          type="text"
          id="descricao"
          className="bg-white rounded-sm text-black"
          value={checkpoint.feedback}
          onChange={(e) =>
            setCheckpoint({ ...checkpoint, feedback: e.target.value })
          }
        />
        <Input
          label="Nota"
          type="number"
          id="nota"
          className="bg-white rounded-sm text-black"
          value={checkpoint.nota}
          onChange={(e) =>
            setCheckpoint({ ...checkpoint, nota: parseFloat(e.target.value) })
          }
        />
        <Input
          label="Data"
          type="date"
          id="data"
          className="bg-white rounded-sm text-black"
          value={
            checkpoint.data
              ? new Date(checkpoint.data).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setCheckpoint({ ...checkpoint, data: new Date(e.target.value) })
          }
        />
        <button
          type="submit"
          className="bg-back text-white rounded-lg p-2 mt-2 hover:bg-primary-dark transition-colors hover:bg-blue-600 "
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
