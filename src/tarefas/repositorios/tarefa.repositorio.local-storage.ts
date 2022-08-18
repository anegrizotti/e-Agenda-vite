import { IRepositorioSerializavel } from "../../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../../shared/repositorio.interface.js";
import { Tarefa } from "../models/tarefa.model.js";

export class TarefaRepositorioLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel {
  private readonly localStorage: Storage;

  private tarefas: Tarefa[];

  constructor() {
    this.localStorage = window.localStorage;
    this.tarefas = this.selecionarTodos();
  }

  excluir(id: string): void {
    this.tarefas = this.tarefas.filter(x => x.id !== id);

    this.gravar();
  }

  editar(id: string, registroEditado: Tarefa): void {
    const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

    this.tarefas[indexSelecionado] = {
      id: id,
      titulo: registroEditado.titulo,
      prioridade: registroEditado.prioridade,
      dataCriacao: registroEditado.dataCriacao
    }

    this.gravar();
  }
  
  selecionarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find(x => x.id === id);
  }

  gravar(): void {
    const tarefasJsonString = JSON.stringify(this.tarefas);
    this.localStorage.setItem("tarefas", tarefasJsonString);
  }

  inserir(registro: Tarefa): void {
    this.tarefas.push(registro);
    this.gravar();
  }

  selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");

    if(!dados) 
      return [];

    return JSON.parse(dados);
  }

}