import { IPaginaHTML } from "../shared/pagina.interface";
import { IPaginaListagem } from "../shared/pagina.listagem.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./models/tarefa.model";
import { TarefaRepositorioLocalStorage } from "./repositorios/tarefa.repositorio.local-storage";



class ListagemTarefa implements IPaginaHTML, IPaginaListagem {
  tabela: HTMLTableElement;

  constructor(private repositorioTarefa: IRepositorio<Tarefa>) {
    this.configurarElementos();
    this.atualizarTabela();
  }
  
  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }

  atualizarTabela(): void {
    const tarefas = this.repositorioTarefa.selecionarTodos();

    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    tarefas.forEach(tarefa => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(tarefa).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;

      });

      const celulaBotoes = novaLinha.insertCell();
      
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-light me-2"

      btnEditar.addEventListener("click", () => {
        const idSelecionado = tarefa.id;

        window.location.href = `inserirTarefa.html?id=${idSelecionado}`;
      });

      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-danger"

      btnExcluir.addEventListener("click", () => {
        const idSelecionado = tarefa.id

        this.repositorioTarefa.excluir(idSelecionado);

        window.location.reload();
      })

      celulaBotoes.appendChild(btnEditar);
      celulaBotoes.appendChild(btnExcluir);

    })
  }
}

new ListagemTarefa(new TarefaRepositorioLocalStorage());
