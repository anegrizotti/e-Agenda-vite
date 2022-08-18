import { EntidadeBase } from "../../shared/entidadeBase.model.js";

export class Tarefa extends EntidadeBase {
  public titulo: string;
  public prioridade: string;
  public dataCriacao: Date;

  constructor(titulo: string, prioridade: string, id?: string) {
    super();

    if(id) {
      this.id = id;
    }

    this.titulo = titulo;
    this.prioridade = prioridade;
    this.dataCriacao = new Date();
  }
  
} 