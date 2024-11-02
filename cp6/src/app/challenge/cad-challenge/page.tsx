"use client";

import { useState } from "react";
import { TipoChallenge } from "@/types";
import { useRouter } from "next/navigation";
import Input from "~/components/Input/Input";

export default function CadChallenge() {
  const navigate = useRouter();

  const [challenge, setChallenge] = useState<TipoChallenge>({
    $id: 0,
    nome: "",
    descricao: "",
    nota: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/base-challenge/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
      });

      if (response.ok) {
        alert("Produto cadastrado com sucesso!");
        setChallenge({ $id: 0, nome: "", descricao: "", nota: 0 });

        navigate.push("/challenge");
      }
    } catch (error) {
      console.error("Ocorreu um erro no cadastro", error);
    }
  };

  return (
    <div className="challenge-container flex flex-col h-80vh justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-1/2"
      >
        <Input
          label="Nome"
          type="text"
          id="nome"
          className="bg-white rounded-sm text-black"
          value={challenge.nome}
          onChange={(e) => setChallenge({ ...challenge, nome: e.target.value })}
        />
        <Input
          label="Descrição"
          type="text"
          id="descricao"
          className="bg-white rounded-sm text-black"
          value={challenge.descricao}
          onChange={(e) =>
            setChallenge({ ...challenge, descricao: e.target.value })
          }
        />
        <Input
          label="Nota"
          type="number"
          id="nota"
          className="bg-white rounded-sm text-black"
          value={challenge.nota}
          onChange={(e) =>
            setChallenge({ ...challenge, nota: parseFloat(e.target.value) })
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
