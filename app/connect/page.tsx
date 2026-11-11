import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, Users, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { churchInfo } from "@/lib/church-info";

export const metadata: Metadata = {
  title: "Conecte-se",
  description: `Dê o próximo passo na ${churchInfo.name} — peça oração ou fale com a gente.`,
};

const cards = [
  {
    href: "/connect/pray",
    icon: HandHeart,
    title: "Pedidos de oração",
    description:
      "Envie um pedido à equipe pastoral — com todo o sigilo.",
  },
  {
    href: "/connect/contact",
    icon: MessageSquare,
    title: "Contato",
    description: "Dúvidas, sugestões ou só quer dizer oi? Respondemos todas as mensagens.",
  },
];

export default function ConnectPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Conecte-se
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Igreja é gente. Veja como dar o próximo passo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Seja você novo por aqui ou membro há anos, sempre há um próximo
            passo na vida em comunidade. Escolha o que faz sentido para você.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-start gap-5 rounded-xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className="flex items-start justify-between gap-3 font-serif text-2xl">
                    {c.title}
                    <ArrowUpRight className="h-5 w-5 text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {c.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
