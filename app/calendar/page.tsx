import type { Metadata } from "next";
import { CalendarView } from "@/components/sections/calendar-view";
import { oneOffEvents } from "@/lib/calendar-data";
import { churchInfo } from "@/lib/church-info";

export const metadata: Metadata = {
  title: "Agenda",
  description: `Tudo o que acontece na ${churchInfo.name} — cultos, programações da semana e eventos especiais.`,
};

// Data do build; o calendário troca para o mês atual ao abrir no navegador.
const TODAY_ISO = new Date().toISOString().slice(0, 10);

export default function CalendarPage() {
  const featured = oneOffEvents.filter((e) => e.isFeatured).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Agenda
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            O que está acontecendo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Cultos, programações durante a semana e eventos especiais. Clique
            em um evento para ver detalhes ou adicioná-lo à agenda do celular.
          </p>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="container pt-16 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Em breve
          </p>
          <h2 className="mt-3 font-serif text-2xl md:text-3xl">
            Eventos especiais que vêm por aí.
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((ev) => (
              <li
                key={ev.id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {new Date(ev.date + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-2 font-serif text-xl">{ev.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {ev.time} · {ev.location}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="container py-16 md:py-20">
        <CalendarView initialDate={TODAY_ISO} />
      </section>
    </>
  );
}
