"use client";

import { useEffect, useState } from "react";
import { TipoGs } from "@/types";
import Link from "next/link";

export default function Gs() {
  const [gs, setGs] = useState<TipoGs[]>([]);

  const chamadaDaApi = async () => {
    const response = await fetch("/api/base-gs");
    const dados = await response.json();
    setGs(dados);
  };

  useEffect(() => {
    chamadaDaApi();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/base-gs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Gs foi excluído com sucesso!");
        chamadaDaApi();
      }
    } catch (error) {
      console.error("Falha ao realizar a exclusão do gs.", error);
    }
  };

  return (
    <div className="gs-container flex flex-col w-full h-80vh items-center justify-around">
      <h1 className="gs-container-h1 text-5xl">Global Solution</h1>
      <div className="gs-list w-full h-1/2 flex items-center justify-center gap-4">
        {gs.map((gs) => (
          <div
            key={gs.$id}
            className="flex flex-col items-center justify-around h-full bg-back rounded-lg shadow-lg w-96"
          >
            <h2>Nome: {gs.nome}</h2>
            <p className="text-center">Descrição: {gs.descricao}</p>
            <p>Nota: {gs.nota}</p>

            <Link
              href={gs.link}
              target="_blank"
              className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
            >
              Link
            </Link>
            <div className="gs-list-item-actions w-full flex justify-around">
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href={`/gs/${gs.$id}`}
              >
                Editar
              </Link>
              <Link
                className="hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
                href="#"
                onClick={() => handleDelete(gs.$id)}
              >
                Excluir
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/gs/cad-gs"
        className="hover:t-color hover:text-lg transition-all duration-200 ease-in-out"
      >
        Cadastrar novo Global Solution
      </Link>
    </div>
  );
}
