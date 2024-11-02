"use client";
import { TipoGs } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "~/components/Input/Input";

export default function GlobalSolution({ params }: { params: { id: number } }) {
  const navigate = useRouter();

  const [gs, setGs] = useState<TipoGs>({
    $id: 0,
    nome: "",
    descricao: "",
    nota: 0,
    link: "",
  });

  useEffect(() => {
    const chamadaApi = async (id: number) => {
      try {
        const response = await fetch(`/api/base-gs/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar gs");
        }
        const dados = await response.json();
        setGs(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do gs", error);
      }
    };

    chamadaApi(params.id);
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGs((prevGs) => ({
      ...prevGs,
      [name]: name === "nota" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/base-gs/${gs.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gs),
      });

      if (response.ok) {
        alert("Gs atualizado com sucesso!");
        setGs({
          $id: 0,
          nome: "",
          descricao: "",
          nota: 0,
          link: "",
        });

        navigate.push("/gs");
      }
    } catch (error) {
      console.error("Ocorreu um erro na atualização do gs.", error);
    }
  };

  return (
    <div className="flex w-full justify-around">
      <div className="h-100 flex flex-col justify-around text-center">
        <h1 className="text-2xl">PREVIEW</h1>
        <h1>Nome: {gs.nome}</h1>
        <p>Descrição: {gs.descricao}</p>
        <p>Nota: {gs.nota}</p>
        <p>Link: {gs.link}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            label="nome"
            type="text"
            name="nome"
            id="nome"
            className="bg-white rounded-sm text-black"
            value={gs.nome}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="descricao"
            type="text"
            name="descricao"
            id="descricao"
            className="bg-white rounded-sm text-black"
            value={gs.descricao}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="nota"
            type="number"
            name="nota"
            id="nota"
            className="bg-white rounded-sm text-black"
            value={gs.nota}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="link"
            type="text"
            name="link"
            id="link"
            className="bg-white rounded-sm text-black"
            value={gs.link}
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
