import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./models/contato.model";
import { ContatoRepositorioLocalStorage } from "./repositorios/contato.repositorio.local-storage";


class InserirContatoPagina implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnInserir: HTMLButtonElement;
  private idSelecionado: string;

  constructor(private repositorioContato: IRepositorio<Contato>, id?: string) {
    this.configurarElementos();

    if(id) {
      this.idSelecionado = id;

      const contatoSelecionado = this.repositorioContato.selecionarPorId(id);

      if(contatoSelecionado) {
        this.preencherFormulario(contatoSelecionado);
      }
    }
  }

  preencherFormulario(contatoSelecionado: Contato) {
    this.txtNome.value = contatoSelecionado.nome;
    this.txtEmail.value = contatoSelecionado.email;
    this.txtTelefone.value = contatoSelecionado.telefone;
    this.txtEmpresa.value = contatoSelecionado.empresa;
    this.txtCargo.value = contatoSelecionado.cargo;
  }


  gravarRegistros(): void {
    const contato = this.obterDadosFormulario();

    if(!this.idSelecionado) {
      this.repositorioContato.inserir(contato);
    }
    else {
      this.repositorioContato.editar(contato.id, contato);
    }

    window.location.href = "listaContatos.html";
  }

  obterDadosFormulario() : Contato {
    const nome = this.txtNome.value;
    const email = this.txtEmail.value;
    const telefone = this.txtEmpresa.value;
    const empresa = this.txtEmpresa.value;
    const cargo = this.txtCargo.value;

    let contato = null;

    if (!this.idSelecionado) {
      contato = new Contato(nome, email, telefone, empresa, cargo);
    }
    else{
      contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);
    }

    return contato;
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("nome") as HTMLInputElement;
    this.txtEmail = document.getElementById("email") as HTMLInputElement;
    this.txtTelefone = document.getElementById("phone") as HTMLInputElement;
    this.txtEmpresa = document.getElementById("empresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("cargo") as HTMLInputElement;
    this.btnInserir = document.getElementById("btnInserir") as HTMLButtonElement;

    this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
  }

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new InserirContatoPagina(new ContatoRepositorioLocalStorage(), id);