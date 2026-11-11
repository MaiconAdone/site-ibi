import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Headphones,
  Youtube,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSermons, getLatestSermon } from "@/content/sermons";
import { getAllSeries } from "@/content/sermons-series";
import { churchInfo } from "@/lib/church-info";
import { findSocial } from "@/lib/social";
import { WatchArchive } from "@/components/sections/watch-archive";

export const metadata: Metadata = {
  title: "Assista",
  description: `Mensagens da ${churchInfo.name} — assista à última pregação ou navegue pelo arquivo por série ou livro da Bíblia.`,
};

function formatLongDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WatchPage() {
  const allSermons = getAllSermons();
  const latestSermon = getLatestSermon();
  const archiveSermons = allSermons.slice(1);
  const hasSeries = getAllSeries().length > 0;
  const youtubeSocial = findSocial(churchInfo.social, "youtube");

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Assista e ouça
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Todo domingo, a Bíblia ensinada com fidelidade.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Assista à última mensagem, navegue pelo arquivo ou leia as anotações do pastor para meditar durante a semana.
          </p>
        </div>
      </section>

      {latestSermon ? (
      <section className="container py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Destaque · Último domingo
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Comece por aqui.
            </h2>
          </div>
          <Link
            href={`/watch/${latestSermon.id}`}
            className="text-sm font-medium text-foreground/80 hover:text-accent"
          >
            Abrir esta mensagem →
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid lg:grid-cols-5">
            <Link
              href={`/watch/${latestSermon.id}`}
              aria-label={`Assistir: ${latestSermon.title}`}
              className="group relative block aspect-video lg:col-span-3 lg:aspect-auto"
            >
              <Image
                src={latestSermon.thumbnail}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl transition group-hover:scale-110 md:h-24 md:w-24">
                  <Play className="h-8 w-8 translate-x-0.5 fill-current md:h-10 md:w-10" />
                </span>
              </div>
              {latestSermon.series ? (
                <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  {latestSermon.series}
                </span>
              ) : null}
            </Link>

            <div className="flex flex-col justify-between gap-6 p-8 lg:col-span-2 lg:p-10">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {formatLongDate(latestSermon.date)} · {latestSermon.speaker}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug md:text-3xl">
                  {latestSermon.title}
                </h3>
                <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-accent">
                  <BookOpen className="h-4 w-4" />
                  {latestSermon.scripture}
                </p>
                <p className="mt-5 text-foreground/85">
                  {latestSermon.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={`/watch/${latestSermon.id}`}>
                    <Play className="h-4 w-4" />
                    Assistir
                  </Link>
                </Button>
                {latestSermon.audioUrl && latestSermon.audioUrl !== "#" ? (
                  <Button asChild variant="outline">
                    <a href={latestSermon.audioUrl}>
                      <Headphones className="h-4 w-4" />
                      Ouvir
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Arquivo de mensagens
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                Mensagens anteriores.
              </h2>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <p className="max-w-md text-sm text-muted-foreground">
                Filtre por série, pregador ou livro da Bíblia.
              </p>
              {hasSeries ? (
                <Link
                  href="/watch/series"
                  className="text-sm font-medium text-foreground/80 hover:text-accent"
                >
                  Ver por série →
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-10">
            <WatchArchive sermons={archiveSermons} />
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <div
            className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                Inscreva-se
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                Leve o domingo com você.
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/85">
                As mensagens são publicadas no nosso canal. Inscreva-se no YouTube para não perder nenhuma.
              </p>
            </div>

            <div className="grid gap-4 self-center">
              {youtubeSocial && (
                <SubscribeCard
                  icon={Youtube}
                  title="No YouTube"
                  description="Vídeos das mensagens e transmissões ao vivo."
                  href={youtubeSocial.url}
                  cta="Abrir YouTube"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SubscribeCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-start gap-4 rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.04] p-5 transition hover:bg-primary-foreground/[0.08]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="font-serif text-lg">{title}</p>
        <p className="mt-0.5 text-sm text-primary-foreground/75">
          {description}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 text-primary-foreground/60 transition group-hover:translate-x-0.5 group-hover:text-primary-foreground" />
      <span className="sr-only">{cta}</span>
    </a>
  );
}
