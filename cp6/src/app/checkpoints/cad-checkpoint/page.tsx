"use client";

import { useState } from "react";
import { TipoGs } from "@/types";
import { useRouter } from "next/navigation";
import Input from "~/components/Input/Input";

export default function CadGs() {
  const navigate = useRouter();

  const [gs, setGs] = useState<TipoGs>({
    $id: 0,
    nome: "",
    descricao: "",
    nota: 0,
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/base-gs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gs),
      });

      if (response.ok) {
        alert("Produto cadastrado com sucesso!");
        setGs({ $id: 0, nome: "", descricao: "", nota: 0, link: "" });

        navigate.push("/gs");
      }
    } catch (error) {
      console.error("Ocorreu um erro no cadastro", error);
    }
  };

  return (
    <div className="gs-container flex flex-col h-80vh justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-1/2"
      >
        <Input
          label="Nome"
          type="text"
          id="nome"
          className="bg-white rounded-sm text-black"
          value={gs.nome}
          onChange={(e) => setGs({ ...gs, nome: e.target.value })}
        />
        <Input
          label="Descrição"
          type="text"
          id="descricao"
          className="bg-white rounded-sm text-black"
          value={gs.descricao}
          onChange={(e) => setGs({ ...gs, descricao: e.target.value })}
        />
        <Input
          label="Nota"
          type="number"
          id="nota"
          className="bg-white rounded-sm text-black"
          value={gs.nota}
          onChange={(e) => setGs({ ...gs, nota: parseFloat(e.target.value) })}
        />
        <Input
          label="Link"
          type="text"
          id="link"
          className="bg-white rounded-sm text-black"
          value={gs.link}
          onChange={(e) => setGs({ ...gs, link: e.target.value })}
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
