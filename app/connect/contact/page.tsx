import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { getStaff } from "@/content/staff";
import { churchInfo } from "@/lib/church-info";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${churchInfo.name}. Liderança, horário da secretaria e formulário de contato.`,
};

export default function ContactPage() {
  const staff = getStaff();
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Contato
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Como falar com a gente.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            No horário da secretaria, uma pessoa de verdade atende o telefone.
            As mensagens vão para quem melhor pode responder.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-serif text-3xl">Envie uma mensagem</h2>
            <p className="mt-3 text-muted-foreground">
              Respondemos em até dois dias úteis.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-7">
              <h3 className="font-serif text-xl">Informações</h3>
              <ul className="mt-5 space-y-5 text-sm">
                <InfoRow icon={MapPin} label="Endereço">
                  <a
                    href={churchInfo.address.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    {churchInfo.address.street}
                    <br />
                    {churchInfo.address.city} - {churchInfo.address.state}
                    {churchInfo.address.zip ? `, CEP ${churchInfo.address.zip}` : ""}
                  </a>
                </InfoRow>
                <InfoRow icon={Phone} label="Telefone">
                  <a href={churchInfo.phoneHref} className="hover:text-accent">
                    {churchInfo.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} label="E-mail">
                  <a href={churchInfo.emailHref} className="hover:text-accent">
                    {churchInfo.email}
                  </a>
                </InfoRow>
                <InfoRow icon={Clock} label="Secretaria">
                  {churchInfo.officeHours}
                  <br />
                  <span className="text-muted-foreground">
                    Fora desse horário, fale conosco nos cultos
                  </span>
                </InfoRow>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Liderança
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Com quem você vai falar.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Se já sabe com quem quer falar, escreva direto — senão, o
              formulário acima chega à pessoa certa.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((person) => (
              <li
                key={person.name}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={88}
                  height={88}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <h3 className="mt-5 font-serif text-xl">{person.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {person.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {person.bio}
                </p>
                {person.email ? (
                  <a
                    href={`mailto:${person.email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    {person.email}
                  </a>
                ) : (
                  <a
                    href={churchInfo.emailHref}
                    className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    Falar com a secretaria
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-foreground/85">{children}</div>
      </div>
    </li>
  );
}
