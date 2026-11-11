import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { beliefs } from "@/content/beliefs";
import { churchInfo } from "@/lib/church-info";

export const metadata: Metadata = {
  title: "No que cremos",
  description: `A base doutrinária da ${churchInfo.name} — a fé cristã histórica, firmada nas Escrituras.`,
};

export default function BeliefsPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <BookOpen className="h-5 w-5" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            No que cremos
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            A fé cristã histórica, firmada nas Escrituras.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Estas são as convicções que moldam a vida da {churchInfo.name}.
            Cada uma está firmada nas Escrituras — a Palavra de Deus é a base
            de tudo o que fazemos.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <ol className="mx-auto max-w-3xl space-y-10">
          {beliefs.map((b, i) => (
            <li
              key={b.title}
              className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8"
            >
              <span className="font-serif text-3xl leading-none text-accent sm:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">{b.title}</h2>
                <p className="mt-3 text-foreground/85 md:text-lg">
                  {b.statement}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl">
              A versão completa.
            </h2>
            <p className="mt-4 text-muted-foreground">
              As declarações acima resumem nossas convicções. Teremos prazer em
              enviar a declaração de fé completa, o pacto da igreja ou o
              estatuto — e em conversar sobre qualquer ponto tomando um café.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent">
                <a href={`${churchInfo.emailHref}?subject=Request%20for%20doctrinal%20statement`}>
                  <Mail className="h-4 w-4" />
                  Enviar e-mail
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">
                  Mais sobre nós
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
