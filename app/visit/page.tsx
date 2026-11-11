import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Car,
  Shirt,
  Smile,
  Music,
  BookOpen,
  Coffee,
  ShieldCheck,
  Heart,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { churchInfo } from "@/lib/church-info";
import { VisitForm } from "@/components/sections/visit-form";
import type { Service } from "@/lib/church-info";

function formatServiceTimes(services: readonly Service[]): string {
  const map = new Map<string, string[]>();
  for (const s of services) {
    if (!s.day || !s.time) continue;
    const existing = map.get(s.day);
    if (existing) existing.push(s.time);
    else map.set(s.day, [s.time]);
  }
  if (map.size === 0) return "Domingos";
  return Array.from(map.entries())
    .map(([day, times]) => `${day}, às ${times.join(" e ")}`)
    .join("; ");
}

export const metadata: Metadata = {
  title: "Planeje sua visita",
  description: `Saiba o que esperar em um culto na ${churchInfo.name} — onde estacionar, como se vestir e para onde vão as crianças.`,
};

const timeline = [
  {
    time: "18h45",
    title: "Portas abertas",
    body: "Chegue com calma e vá até a entrada principal. Alguém da recepção estará na porta para receber você e indicar o café e o templo.",
    icon: Coffee,
  },
  {
    time: "19h00",
    title: "Louvor",
    body: "Cantamos hinos e canções de adoração. Fique de pé, sentado, cante ou apenas ouça — não existe jeito errado de estar aqui.",
    icon: Music,
  },
  {
    time: "~19h30",
    title: "Pregação da Palavra",
    body: "O pastor expõe uma passagem das Escrituras por cerca de 40 minutos, estudando os livros da Bíblia capítulo por capítulo.",
    icon: BookOpen,
  },
  {
    time: "~19h30",
    title: "Café e comunhão",
    body: "Fique um pouco depois do culto. Tome um café, conheça algumas pessoas e busque as crianças. Vamos adorar conversar com você.",
    icon: Smile,
  },
];

const basics = [
  {
    icon: Car,
    title: "Onde estacionar",
    body: "[Ajuste: informe se a igreja tem estacionamento próprio ou onde é mais fácil estacionar na rua.]",
  },
  {
    icon: Shirt,
    title: "Como se vestir",
    body: "Venha como se sentir bem. Não existe um padrão de roupa — o importante é você estar aqui.",
  },
  {
    icon: Heart,
    title: "Vou ficar em evidência?",
    body: "Não. A recepção ajuda você a encontrar um lugar, mas ninguém vai pedir para você se levantar ou se apresentar. Fique à vontade.",
  },
];

export default function VisitPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/placeholders/hero.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/65 via-foreground/55 to-foreground/80" />
        </div>

        <div className="container relative flex min-h-[58vh] flex-col justify-center py-20 text-background md:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-background/75 animate-fade-up">
            Planeje sua visita
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl animate-fade-up">
            Entrar em uma igreja nova pode dar um frio na barriga. Aqui está tudo o que você precisa saber.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-background/85 animate-fade-up">
            {formatServiceTimes(churchInfo.services)} · {churchInfo.address.full}. Guardamos um lugar para você.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up">
            <Button asChild size="lg" variant="accent">
              <Link href="#let-us-know">
                Avise que você vem
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <a href={churchInfo.address.mapsUrl} target="_blank" rel="noreferrer">
                Como chegar
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Como é o culto
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Cerca de uma hora e meia, do começo ao fim.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tudo é simples: café, louvor, a Bíblia, oração e pessoas
            sinceramente felizes por você ter vindo.
          </p>
        </div>

        <ol className="mx-auto mt-14 max-w-2xl space-y-6">
          {timeline.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.time} className="relative flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  {i < timeline.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mt-2 flex-1 w-px bg-border"
                    />
                  ) : null}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {step.time}
                  </p>
                  <h3 className="mt-1 font-serif text-xl">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              O básico
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              As três coisas que todo visitante quer saber.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {basics.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-lg border border-border bg-card p-7"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl">{b.title}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/placeholders/plan-a-visit.svg"
              alt="Crianças participando de atividades"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Seus filhos
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Tratamos as crianças como os convidados mais importantes.
            </h2>
            <p className="mt-5 text-muted-foreground">
              O Ministério Infantil funciona durante o culto para crianças de{" "}
              <span className="font-medium text-foreground">0 a 11 anos</span>.
              Cada criança recebe uma lição bíblica adequada à sua idade, com brincadeiras, músicas e lanche.
            </p>

            <ul className="mt-8 space-y-4">
              <KidsBullet
                icon={ShieldCheck}
                title="Segurança sempre"
                body="Os voluntários são preparados e a criança só é entregue ao responsável que a deixou."
              />
              <KidsBullet
                icon={Smile}
                title="Recepção fácil"
                body="Ao chegar, procure a recepção infantil perto da entrada. O cadastro na primeira visita leva poucos minutos."
              />
              <KidsBullet
                icon={Heart}
                title="Criança tímida? Sem problema."
                body="Você pode ficar na sala com seu filho pelo tempo que quiser. Sem pressa."
              />
            </ul>

            <Button asChild variant="outline" className="mt-8">
              <Link href="/ministries/kids">
                Mais sobre o Ministério Infantil
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container grid gap-10 lg:grid-cols-5 lg:items-stretch">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Como nos encontrar
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Venha nos visitar.
            </h2>

            <dl className="mt-7 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <dt className="font-medium text-foreground">Endereço</dt>
                  <dd>
                    <a
                      href={churchInfo.address.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-accent"
                    >
                      {churchInfo.address.street}
                      <br />
                      {churchInfo.address.city} - {churchInfo.address.state}
                      {churchInfo.address.zip ? `, CEP ${churchInfo.address.zip}` : ""}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <dt className="font-medium text-foreground">Horários dos cultos</dt>
                  <dd className="text-muted-foreground">
                    {formatServiceTimes(churchInfo.services)}.
                    {churchInfo.primaryService?.note
                      ? ` ${churchInfo.primaryService.note}.`
                      : ""}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <dt className="font-medium text-foreground">Telefone</dt>
                  <dd>
                    <a
                      href={churchInfo.phoneHref}
                      className="text-muted-foreground hover:text-accent"
                    >
                      {churchInfo.phone}
                    </a>{" "}
                    · Secretaria: {churchInfo.officeHours}
                  </dd>
                </div>
              </div>
            </dl>

            <Button asChild className="mt-8">
              <a href={churchInfo.address.mapsUrl} target="_blank" rel="noreferrer">
                Abrir no Google Maps
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-3">
            <iframe
              title={`Mapa até a ${churchInfo.name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(churchInfo.address.full)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="block h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="let-us-know" className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Avise que você vem
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Vamos esperar por você.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Não é obrigatório — mas assim podemos receber você pelo nome e preparar uma lembrancinha na recepção.
            </p>
          </div>

          <div className="mt-10">
            <VisitForm />
          </div>
        </div>
      </section>
    </>
  );
}

function KidsBullet({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
