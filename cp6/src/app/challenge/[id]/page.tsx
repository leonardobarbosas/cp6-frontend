"use client";
import { TipoChallenge } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "~/components/Input/Input";

export default function Desafio({ params }: { params: { id: number } }) {
  const navigate = useRouter();

  const [challenge, setChallenge] = useState<TipoChallenge>({
    $id: 0,
    nome: "",
    descricao: "",
    nota: 0,
  });

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      chamadaApi(unwrappedParams.id);
    };

    const chamadaApi = async (id: number) => {
      try {
        const response = await fetch(`/api/base-challenge/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar desafio");
        }
        const dados = await response.json();
        setChallenge(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do desafio", error);
      }
    };

    unwrapParams();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallenge({ ...challenge, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/base-challenge/${challenge.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
      });

      if (response.ok) {
        alert("Challenge atualizado com sucesso!");
        setChallenge({
          $id: 0,
          nome: "",
          descricao: "",
          nota: 0,
        });

        navigate.push("/challenge");
      }
    } catch (error) {
      console.error("Ocorreu um erro na atualização do produto.", error);
    }
  };

  return (
    <div>
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
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Descrição"
          type="text"
          id="descricao"
          className="bg-white rounded-sm text-black"
          value={challenge.descricao}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Nota"
          type="number"
          id="nota"
          className="bg-white rounded-sm text-black"
          value={challenge.nota}
          onChange={(e) => handleChange(e)}
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
