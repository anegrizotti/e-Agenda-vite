import { resolve } from "path";
import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  base: "/e-Agenda-vite/",
  plugins: [ghPages()],
  root: root,
  build: {
    outDir: outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        tarefaList: resolve(root, "tarefas/listaTarefas.html"),
        tarefaCreate: resolve(root, "tarefas/inserirTarefa.html"),
        contatoList: resolve(root, "contatos/listaContatos.html"),
        contatoCreate: resolve(root, "contatos/inserirContato.html"),
      }
    }
  },
  publicDir: "../public"
});