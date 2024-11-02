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

    chamadaApi(params.id);
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      [name]: name === "nota" ? parseFloat(value) : value,
    }));
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
    <div className="flex w-full justify-around">
      <div className="h-100 flex flex-col justify-around text-center">
        <h1 className="text-2xl">PREVIEW</h1>
        <h1>Nome: {challenge.nome}</h1>
        <p>Descrição: {challenge.descricao}</p>
        <p>Nota: {challenge.nota}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            label="nome"
            type="text"
            name="nome"
            id="nome"
            className="bg-white rounded-sm text-black"
            value={challenge.nome}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="descricao"
            type="text"
            name="descricao"
            id="descricao"
            className="bg-white rounded-sm text-black"
            value={challenge.descricao}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="nota"
            type="number"
            name="nota"
            id="nota"
            className="bg-white rounded-sm text-black"
            value={challenge.nota}
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="bg-back text-white rounded-lg p-2 mt-2 hover:bg-primary-dark transition-colors hover:bg-blue-600 "
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
