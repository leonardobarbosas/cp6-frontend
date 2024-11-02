"use client";
import { TipoCheckpoint } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "~/components/Input/Input";

export default function GlobalSolution({ params }: { params: { id: number } }) {
  const navigate = useRouter();
  const [checkpoint, setCheckpoint] = useState<TipoCheckpoint>({
    $id: 0,
    nome: "",
    feedback: "",
    data: new Date(),
    nota: 0,
  });

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      const chamadaApi = async (id: number) => {
        try {
          const response = await fetch(`/api/base-checkpoints/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar checkpoint");
          }
          const dados = await response.json();
          setCheckpoint({
            ...dados,
            data: new Date(dados.data),
          });
        } catch (error) {
          console.error("Erro ao buscar dados do checkpoint", error);
        }
      };

      chamadaApi(unwrappedParams.id);
    };

    unwrapParams();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckpoint((prevCheckpoint) => ({
      ...prevCheckpoint,
      [name]: name === "nota" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/base-checkpoints/${checkpoint.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkpoint),
      });

      if (response.ok) {
        alert("Checkpoint atualizado com sucesso!");
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
      console.error("Ocorreu um erro na atualização do checkpoint.", error);
    }
  };

  return (
    <div className="flex w-full justify-around">
      <div className="h-100 flex flex-col justify-around text-center">
        <h1 className="text-2xl">PREVIEW</h1>
        <h1>Nome: {checkpoint.nome}</h1>
        <p>Feedback: {checkpoint.feedback}</p>
        <p>Data: {checkpoint.data.toLocaleDateString()}</p>
        <p>Nota: {checkpoint.nota}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            label="nome"
            type="text"
            name="nome"
            id="nome"
            className="bg-white rounded-sm text-black"
            value={checkpoint.nome}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="feedback"
            type="text"
            name="feedback"
            id="feedback"
            className="bg-white rounded-sm text-black"
            value={checkpoint.feedback}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="nota"
            type="number"
            name="nota"
            id="nota"
            className="bg-white rounded-sm text-black"
            value={checkpoint.nota}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="data"
            type="date"
            name="data"
            id="data"
            className="bg-white rounded-sm text-black"
            value={checkpoint.data.toISOString().split("T")[0]}
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