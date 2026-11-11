"use client";

import { sendViaWhatsApp } from "@/lib/submit";
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpIcon } from "@/components/ui/help-icon";

const TOPICS = [
  "Quero visitar a igreja",
  "Pedido de oração",
  "Quero servir",
  "Batismo",
  "Casamento ou funeral",
  "Outro assunto",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: TOPICS[0],
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      sendViaWhatsApp("contact", form);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-serif text-2xl">Obrigado pelo contato!</h3>
        <p className="mt-3 text-muted-foreground">
          Sua mensagem foi aberta no WhatsApp — é só enviar por lá. Respondemos em até dois dias úteis.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-card p-6 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Seu nome"
          required
          help="Como você gostaria de ser chamado na resposta."
        >
          <Input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nome e sobrenome"
            autoComplete="name"
          />
        </Field>

        <Field
          label="E-mail"
          required
          help="Podemos responder por aqui também."
        >
          <Input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="voce@exemplo.com"
            autoComplete="email"
          />
        </Field>

        <Field
          label="Telefone"
          hint="Opcional."
          help="Informe um telefone se preferir que a gente ligue para você."
        >
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(11) 90000-0000"
            autoComplete="tel"
          />
        </Field>

        <Field
          label="Qual é o assunto?"
          help="O assunto ajuda a encaminhar sua mensagem para a pessoa certa."
        >
          <select
            value={form.topic}
            onChange={(e) => update("topic", e.target.value)}
            className="flex h-11 w-full appearance-none rounded-md border border-input bg-card px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b635a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
              paddingRight: "2.5rem",
            }}
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Mensagem"
          required
          className="sm:col-span-2"
          help="Escreva à vontade, sem formalidade. Lemos todas as mensagens."
        >
          <textarea
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={6}
            placeholder="Escreva sua mensagem."
            className="flex w-full rounded-md border border-input bg-card px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </Field>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : null}
      <Button type="submit" variant="accent" size="lg" className="mt-7 w-full sm:w-auto" disabled={loading}>
        <Send className="h-4 w-4" />
        {loading ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  help,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  help?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-accent">*</span> : null}
        {help ? <HelpIcon text={help} /> : null}
      </span>
      {children}
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}
