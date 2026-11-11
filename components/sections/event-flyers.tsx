"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

export type Flyer = {
  id: string;
  title: string;
  date: string; // AAAA-MM-DD
  endDate?: string;
  time: string;
  description: string;
  image: string;
};

function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  const txt = d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

// Mostra só os eventos de hoje em diante. O build já filtra pela data em que
// foi gerado; no navegador o filtro roda de novo com a data do dia.
export function EventFlyers({ flyers, buildIso }: { flyers: Flyer[]; buildIso: string }) {
  const [today, setToday] = useState(buildIso);
  useEffect(() => setToday(todayIso()), []);

  const upcoming = flyers
    .filter((f) => (f.endDate ?? f.date) >= today)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  if (upcoming.length === 0) return null;

  return (
    <section className="container py-16 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Eventos especiais
      </p>
      <h2 className="mt-3 font-serif text-3xl">Próximos eventos</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {upcoming.map((f) => (
          <article
            key={f.id}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <a href={f.image} target="_blank" rel="noreferrer" aria-label={`Ver arte: ${f.title}`}>
              <Image
                src={f.image}
                alt={`${f.title} — ${formatDate(f.date)}, ${f.time}`}
                width={1280}
                height={720}
                className="aspect-video w-full object-cover"
              />
            </a>
            <div className="p-6">
              <h3 className="font-serif text-2xl">{f.title}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-primary">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  {formatDate(f.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent" />
                  {f.time}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{f.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
