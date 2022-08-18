import { IPaginaHTML } from "../shared/pagina.interface";
import { IPaginaListagem } from "../shared/pagina.listagem.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./models/contato.model";
import { ContatoRepositorioLocalStorage } from "./repositorios/contato.repositorio.local-storage";


class ListagemContato implements IPaginaHTML, IPaginaListagem {
  tabelaContatos: HTMLTableElement;

  constructor(private repositorioContato: IRepositorio<Contato>) {
    this.configurarElementos();
    this.atualizarTabela();
  }
  
  configurarElementos(): void {
    this.tabelaContatos = document.getElementById("tabelaContatos") as HTMLTableElement;
  }

  atualizarTabela(): void {
    const contatos = this.repositorioContato.selecionarTodos();

    let corpoTabela = this.tabelaContatos.getElementsByTagName("tbody")[0];

    contatos.forEach(contato => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(contato).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;

      });

      const celulaBotoes = novaLinha.insertCell();
      
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-light me-2"

      btnEditar.addEventListener("click", () => {
        const idSelecionado = contato.id;

        window.location.href = `inserirContato.html?id=${idSelecionado}`;
      });

      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-danger"

      btnExcluir.addEventListener("click", () => {
        const idSelecionado = contato.id

        this.repositorioContato.excluir(idSelecionado);

        window.location.reload();
      })

      celulaBotoes.appendChild(btnEditar);
      celulaBotoes.appendChild(btnExcluir);

    })
  }
}

new ListagemContato(new ContatoRepositorioLocalStorage());
