export type TipoChallenge = {
  $id: string;
  nome: string;
  descricao: string;
  nota: number;
};

export type TipoCheckpoint = {
  $id: string;
  nome: string;
  data: Date;
  feedback: string;
  nota: number;
};

export type TipoGs = {
  $id: string;
  nome: string;
  descricao: string;
  nota: number;
  link: string;
};

