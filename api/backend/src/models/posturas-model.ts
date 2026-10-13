export interface PosturaModel {
  id: number;
  nome: string;
  faixa: string;
  kati: string;
  nomekatiportugues: string;
  descricao: string;
  imagem: string;
  gif?: string;
}

export type PosturaFilter = Partial<Pick<PosturaModel, "faixa" | "kati">>;
