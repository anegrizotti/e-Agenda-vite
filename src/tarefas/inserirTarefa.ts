import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./models/tarefa.model";
import { TarefaRepositorioLocalStorage } from "./repositorios/tarefa.repositorio.local-storage";


class InserirTarefaPagina implements IPaginaHTML, IPaginaFormulario {
  private txtTitulo: HTMLInputElement;
  private selectedPrioriade: HTMLSelectElement;
  private btnInserir: HTMLButtonElement;
  private idSelecionado: string;

  constructor(private repositorioTarefa: IRepositorio<Tarefa>, id?: string) {
    this.configurarElementos();

    if(id) {
      this.idSelecionado = id;

      const tarefaSelecionada = this.repositorioTarefa.selecionarPorId(id);

      if(tarefaSelecionada) {
        this.preencherFormulario(tarefaSelecionada);
      }
    }
  }

  preencherFormulario(tarefaSelecionada: Tarefa) {
    this.txtTitulo.value = tarefaSelecionada.titulo;
    
    if (tarefaSelecionada.prioridade === "Baixa") 
      this.selectedPrioriade.selectedIndex = 0;

    if (tarefaSelecionada.prioridade === "Média")
      this.selectedPrioriade.selectedIndex = 1;

    if (tarefaSelecionada.prioridade === "Alta")
      this.selectedPrioriade.selectedIndex = 2;
  }


  gravarRegistros(): void {
    const tarefa = this.obterDadosFormulario();

    if(!this.idSelecionado) {
      this.repositorioTarefa.inserir(tarefa);
    }
    else {
      this.repositorioTarefa.editar(tarefa.id, tarefa);
    }

    window.location.href = "listaTarefas.html";
  }

  obterDadosFormulario() : Tarefa {
    const titulo = this.txtTitulo.value;
    const prioridade = this.selectedPrioriade.value;

    let tarefa = null;

    if (!this.idSelecionado) {
      tarefa = new Tarefa(titulo, prioridade);
    }
    else{
      tarefa = new Tarefa(titulo, prioridade, this.idSelecionado);
    }

    return tarefa;
  }

  configurarElementos(): void {
    this.txtTitulo = document.getElementById("titulo") as HTMLInputElement;
    this.btnInserir = document.getElementById("btnInserir") as HTMLButtonElement;
    this.selectedPrioriade = document.getElementById("prioridade") as HTMLSelectElement;

    this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
  }

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new InserirTarefaPagina(new TarefaRepositorioLocalStorage(), id);