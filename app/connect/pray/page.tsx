import type { Metadata } from "next";
import { Phone, Mail, HandHeart, Lock, Users } from "lucide-react";
import { PrayerForm } from "@/components/sections/prayer-form";
import { churchInfo } from "@/lib/church-info";

export const metadata: Metadata = {
  title: "Pedidos de oração",
  description: `Envie um pedido de oração à equipe pastoral da ${churchInfo.name}. Sigiloso — nunca divulgado sem permissão.`,
};


export default function PrayerPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <HandHeart className="h-5 w-5" />
          </span>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] md:text-5xl">
            Pelo que podemos orar por você?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Toda semana, pastores e diáconos oram pelos pedidos recebidos.
            Nenhum assunto é pequeno, complicado ou constrangedor demais.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-serif text-3xl">Envie seu pedido</h2>
            <p className="mt-3 text-muted-foreground">
              Nome e e-mail são opcionais. Compartilhe só o que se sentir à vontade.
            </p>
            <div className="mt-8">
              <PrayerForm />
            </div>
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl">Como cuidamos dos pedidos</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <SidebarItem icon={Lock} title="Sigilo">
                  Só a equipe pastoral vê o pedido. Nunca divulgamos nomes sem
                  permissão.
                </SidebarItem>
                <SidebarItem icon={Users} title="Corrente de oração (opcional)">
                  Se quiser que mais irmãos orem, compartilhamos uma versão sem
                  identificar você.
                </SidebarItem>
                <SidebarItem icon={Phone} title="Precisa falar com alguém agora?">
                  Ligue para{" "}
                  <a className="text-accent hover:underline" href={churchInfo.phoneHref}>
                    {churchInfo.phone}
                  </a>{" "}
                  ou escreva para{" "}
                  <a className="text-accent hover:underline" href={churchInfo.emailHref}>
                    {churchInfo.email}
                  </a>
                  .
                </SidebarItem>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function SidebarItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{children}</p>
      </div>
    </li>
  );
}
