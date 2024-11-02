export type TipoChallenge = {
  $id: number;
  nome: string;
  descricao: string;
  nota: number;
};

export type TipoCheckpoint = {
  $id: number;
  nome: string;
  data: Date;
  feedback: string;
  nota: number;
};

export type TipoGs = {
  $id: number;
  nome: string;
  descricao: string;
  nota: number;
  link: string;
};

