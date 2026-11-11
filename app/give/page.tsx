import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Mail, HandCoins, Smartphone, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GiveButton } from "@/components/GiveButton";
import { SubsplashEmbed } from "@/components/giving/SubsplashEmbed";
import { churchInfo } from "@/lib/church-info";
import {
  givingConfig,
  getGivingHref,
  getProviderDisplayName,
} from "@/lib/giving";

export const metadata: Metadata = {
  title: "Contribua",
  description: `Apoie o trabalho da ${churchInfo.name}. ${givingConfig.supportingMessage}`,
};

// ─── Shared sub-sections ────────────────────────────────────────────────────

function OfflineSection() {
  const og = givingConfig.offlineGiving;
  if (!og?.enabled) return null;

  const hasAddress = og.mailingAddress?.trim();
  const hasInPerson = og.inPersonInstructions?.trim();
  const hasTextToGive = og.textToGive?.enabled && og.textToGive?.number;

  if (!hasAddress && !hasInPerson && !hasTextToGive) return null;

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {hasAddress && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-xl">PIX e transferência</h3>
          <p className="whitespace-pre-line text-sm text-muted-foreground">
            {og.mailingAddress}
          </p>
        </div>
      )}

      {hasInPerson && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <HandCoins className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-xl">Durante o culto</h3>
          <p className="text-sm text-muted-foreground">{og.inPersonInstructions}</p>
          <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
            <Link href="/visit">Planeje sua visita</Link>
          </Button>
        </div>
      )}

      {hasTextToGive && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <Smartphone className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-xl">Por mensagem</h3>
          <p className="text-sm text-muted-foreground">
            Envie{" "}
            <strong>
              {og.textToGive.keyword || "GIVE"}
            </strong>{" "}
            para <strong>{og.textToGive.number}</strong>.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
            <a href={`sms:${og.textToGive.number}&body=${og.textToGive.keyword || "GIVE"}`}>
              Abrir mensagens
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const faqs = givingConfig.faq;
  if (!faqs?.length) return null;

  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Dúvidas frequentes
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              As perguntas que as pessoas fazem.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Não encontrou o que procura? Escreva para{" "}
              <a href={churchInfo.emailHref} className="text-accent hover:underline">
                {churchInfo.email}
              </a>{" "}
              e responderemos.
            </p>
          </div>

          <ul className="space-y-3 lg:col-span-3">
            {faqs.map((faq, i) => (
              <li key={i}>
                <details className="group rounded-xl border border-border bg-card p-5 transition open:shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-foreground/70 transition group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-foreground/85">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AccountabilityBlock() {
  return (
    <section className="container py-16 md:py-20">
      <div className="rounded-xl border border-border bg-card p-7 text-center md:p-10">
        <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h2 className="mt-5 font-serif text-2xl">
          Transparência financeira
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          [Substitua pela declaração de prestação de contas — por exemplo: as
          contas são apresentadas em assembleia e qualquer membro pode
          solicitar os relatórios financeiros.]
        </p>
      </div>
    </section>
  );
}

function PoweredBy() {
  const name = getProviderDisplayName(givingConfig);
  if (!name) return null;
  return (
    <p className="mt-6 text-center text-xs text-muted-foreground">
      Contribuição online segura via {name}.
    </p>
  );
}

// ─── Offline-only layout ─────────────────────────────────────────────────────
// Churches with no online giving get a warm informational page — no buttons,
// just clear instructions on how to give in person or by mail.

function OfflineOnlyPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Heart className="h-5 w-5" />
          </span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            {givingConfig.callToAction || "Contribua"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {givingConfig.supportingMessage}
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Formas de contribuir
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Como contribuir
          </h2>
          <p className="mt-4 text-muted-foreground">
            Você pode contribuir por PIX, transferência ou durante os cultos.
            Obrigado pela sua generosidade.
          </p>
        </div>
        <OfflineSection />
      </section>

      <FaqSection />
      <AccountabilityBlock />
    </>
  );
}

// ─── Subsplash layout ────────────────────────────────────────────────────────
// Subsplash embeds an iframed form directly on the page via their script.

function SubsplashPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Heart className="h-5 w-5" />
          </span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            {givingConfig.callToAction || "Contribua"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {givingConfig.supportingMessage}
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <SubsplashEmbed embedCode={givingConfig.subsplash.embedCode} />
        <PoweredBy />

        {givingConfig.offlineGiving?.enabled && (
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Outras formas de contribuir
            </p>
            <h2 className="mt-3 font-serif text-3xl">Prefere outra forma?</h2>
            <OfflineSection />
          </div>
        )}
      </section>

      <FaqSection />
      <AccountabilityBlock />
    </>
  );
}

// ─── Online provider layout ──────────────────────────────────────────────────
// All other providers: Planning Center, Tithe.ly, Pushpay, Stripe, Custom URL.
// The Give button sends the donor to the provider's hosted giving form.

function OnlinePage() {
  const href = getGivingHref(givingConfig);
  const isExternal = !href.startsWith("/");
  const providerName = getProviderDisplayName(givingConfig);

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Heart className="h-5 w-5" />
          </span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            {givingConfig.callToAction || "Contribua"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {givingConfig.supportingMessage}
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-start gap-4">
          <GiveButton variant="primary" />
          {isExternal && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ExternalLink className="h-3.5 w-3.5" />
              Abre no site seguro de {providerName}
              {givingConfig.displayMode === "modal" ? " (em uma janela sobreposta)" : givingConfig.displayMode === "newTab" ? " em uma nova aba" : ""}.
            </p>
          )}
        </div>
        <PoweredBy />

        {givingConfig.offlineGiving?.enabled && (
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Outras formas de contribuir
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Prefere outra forma?
            </h2>
            <OfflineSection />
          </div>
        )}
      </section>

      <FaqSection />
      <AccountabilityBlock />
    </>
  );
}

// ─── Page entry point ─────────────────────────────────────────────────────────

export default function GivePage() {
  if (givingConfig.provider === "offline_only") {
    return <OfflineOnlyPage />;
  }
  if (givingConfig.provider === "subsplash") {
    return <SubsplashPage />;
  }
  return <OnlinePage />;
}
