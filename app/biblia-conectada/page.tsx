import type { Metadata } from "next";
import { BookOpen, MousePointerClick, Search, Spline } from "lucide-react";
import { ArcExplorer } from "@/components/biblia/arc-explorer";

export const metadata: Metadata = {
  title: "Bíblia Conectada",
  description:
    "Visualização interativa das referências cruzadas da Bíblia, de Gênesis a Apocalipse: 344.799 ligações entre 31.102 versículos, com busca e o texto da Bíblia Livre.",
};

const stats = [
  ["344.799", "referências cruzadas"],
  ["31.102", "versículos"],
  ["1.189", "capítulos"],
  ["212", "ligações de Isaías 9:6"],
];

const howTo = [
  {
    icon: Spline,
    title: "Cada arco é uma ligação",
    text: "Um semicírculo liga dois versículos que citam ou ecoam um ao outro. Arcos curtos (dourados) ficam no mesmo livro; os longos (roxos) atravessam a Bíblia.",
  },
  {
    icon: BookOpen,
    title: "A base são os capítulos",
    text: "Cada barra é um dos 1.189 capítulos, de Gênesis a Apocalipse; a altura é o número de versículos. A barra mais alta é o Salmo 119.",
  },
  {
    icon: MousePointerClick,
    title: "Toque ou passe o mouse",
    text: "O versículo selecionado mostra o texto e as ligações. Clique para fixar e ver a lista completa, das ligações mais fortes para as mais fracas.",
  },
  {
    icon: Search,
    title: "Busque um versículo",
    text: "Digite “Is 9:6”, “João 3:16” ou “Gn 1.1”, ou use os atalhos para estudos temáticos e profecias messiânicas.",
  },
];

export default function BibliaConectadaPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Bíblia Conectada
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Toda a Escritura conectada.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Todas as referências cruzadas da Bíblia em um só gráfico, de Gênesis a
            Apocalipse. Explore os arcos, busque um versículo e veja como os textos se
            conectam.
          </p>
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-4">
                <strong className="block font-serif text-2xl">{value}</strong>
                <span className="block text-xs text-muted-foreground sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="explorar" className="container scroll-mt-24 py-10 md:py-14">
        <ArcExplorer />
      </section>

      <section className="container pb-16 md:pb-24">
        <h2 className="font-serif text-3xl">Como ler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howTo.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-muted/40 p-6 text-sm leading-7 text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Fontes e créditos</h2>
          <p className="mt-2">
            Referências cruzadas:{" "}
            <a
              href="https://www.openbible.info/labs/cross-references/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              OpenBible.info
            </a>{" "}
            (CC-BY), derivado do Treasury of Scripture Knowledge. Texto: Bíblia Livre
            (BLIVRE), © Diego Santos, Mario Sérgio e Marco Teles, licença Creative Commons
            Atribuição 4.0 Brasil. Visualização inspirada no trabalho de Chris Harrison e
            Christoph Römhild (2007). Projeto{" "}
            <a
              href="https://adoneintelligence.com.br/biblia-conectada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Bíblia Conectada
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
