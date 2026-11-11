import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, BookOpen, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { churchInfo } from "@/lib/church-info";
import siteData from "@/content/site.json";
import { oneOffEvents } from "@/lib/calendar-data";
import { EventFlyers, type Flyer } from "@/components/sections/event-flyers";

const BUILD_ISO = new Date().toISOString().slice(0, 10);
const flyers: Flyer[] = oneOffEvents
  .filter((e) => e.image)
  .map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    endDate: e.endDate,
    time: e.time,
    description: e.description,
    image: e.image as string,
  }));

export const metadata: Metadata = {
  title: "Programação",
  description: `Horários dos cultos e encontros da ${churchInfo.name}.`,
};

type Extra = { name: string; when: string; note: string; cta?: string };
const extras: Extra[] =
  (siteData as { programacao?: { extras?: Extra[] } }).programacao?.extras ?? [];

const whatsapp = (siteData as { church: { whatsapp?: string } }).church.whatsapp;

function waLink(text: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

function everyDay(day: string) {
  return day === "Domingo" || day === "Sábado"
    ? `Todo ${day.toLowerCase()}`
    : `Toda ${day.toLowerCase()}`;
}

export default function ProgramacaoPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Programação
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Nossos cultos e encontros.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Você é sempre bem-vindo. Veja quando nos reunimos durante a semana.
          </p>
        </div>
      </section>

      <EventFlyers flyers={flyers} buildIso={BUILD_ISO} />

      <section className="container py-16 md:py-20">
        <h2 className="font-serif text-3xl">Cultos semanais</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {churchInfo.services.map((s) => (
            <div
              key={s.name}
              className={`rounded-xl border bg-card p-7 ${
                s.primary ? "border-accent" : "border-border"
              }`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                <CalendarDays className="h-4 w-4" />
                {everyDay(s.day)}
              </p>
              <h3 className="mt-3 font-serif text-2xl">{s.name}</h3>
              <p className="mt-3 flex items-center gap-2 text-3xl font-semibold text-primary">
                <Clock className="h-6 w-6" />
                {s.time}
              </p>
              {s.note ? (
                <p className="mt-3 text-sm text-muted-foreground">{s.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {extras.length > 0 ? (
        <section className="border-t border-border bg-muted/40">
          <div className="container py-16 md:py-20">
            <h2 className="font-serif text-3xl">Outros encontros</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {extras.map((e, i) => {
                const Icon = i === 0 ? BookOpen : Heart;
                return (
                  <div key={e.name} className="rounded-xl border border-border bg-card p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-accent">
                      {e.when}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl">{e.name}</h3>
                    <p className="mt-3 text-muted-foreground">{e.note}</p>
                    {e.cta && whatsapp ? (
                      <Button asChild className="mt-6">
                        <a
                          href={waLink(`Olá! Gostaria de informações sobre: ${e.name}.`)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {e.cta}
                        </a>
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container py-16 md:py-20">
        <div className="flex flex-col items-start gap-5 rounded-xl border border-border bg-card p-7 md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-3 text-lg">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <span>
              {churchInfo.address.street}
              <br />
              <span className="text-muted-foreground">
                {churchInfo.address.city} - {churchInfo.address.state}
              </span>
            </span>
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/calendar">Ver agenda</Link>
            </Button>
            <Button asChild>
              <Link href="/visit">Planeje sua visita</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
