"use client";

import { sendViaWhatsApp } from "@/lib/submit";
import { useState } from "react";
import { Check, Send, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpIcon } from "@/components/ui/help-icon";

export function PrayerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
    privateToTeam: true,
    wantsCall: false,
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      sendViaWhatsApp("prayer", form);
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
        <h3 className="mt-5 font-serif text-2xl">Estamos orando por você.</h3>
        <p className="mt-3 text-muted-foreground">
          Seu pedido foi aberto no WhatsApp — é só enviar por lá. Se você
          pediu uma ligação, entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-card p-6 md:p-10"
    >
      <div className="grid gap-5">
        <Field
          label="Seu nome"
          hint="Opcional — pode ser anônimo."
          help="Seu nome fica restrito à equipe pastoral. Deixe em branco para enviar anonimamente."
        >
          <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nome (ou só o primeiro nome)"
            autoComplete="name"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="E-mail"
            hint="Só se quiser um retorno."
            help="Um pastor pode responder por e-mail. Deixe em branco se não quiser contato."
          >
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="voce@exemplo.com"
              autoComplete="email"
            />
          </Field>
          <Field
            label="Telefone"
            hint="Obrigatório se quiser uma ligação."
            help="Usado só se você marcar a opção “Quero que alguém me ligue” abaixo."
          >
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(11) 90000-0000"
              autoComplete="tel"
              required={form.wantsCall}
            />
          </Field>
        </div>

        <Field
          label="Pelo que podemos orar?"
          required
          help="Compartilhe o quanto quiser. A equipe pastoral ora por todos os pedidos."
        >
          <textarea
            required
            value={form.request}
            onChange={(e) => update("request", e.target.value)}
            rows={6}
            placeholder="Compartilhe o quanto quiser."
            className="flex w-full rounded-md border border-input bg-card px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </Field>

        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-5">
          <Checkbox
            checked={form.privateToTeam}
            onChange={(v) => update("privateToTeam", v)}
            label="Manter restrito à equipe pastoral"
            description="Por padrão, os pedidos são sigilosos. Desmarque se quiser que compartilhemos (sem identificar você) com a corrente de oração."
          />
          <Checkbox
            checked={form.wantsCall}
            onChange={(v) => update("wantsCall", v)}
            label="Quero que alguém me ligue"
            description="Um pastor entrará em contato em até 2 dias."
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : null}
      <Button type="submit" variant="accent" size="lg" className="mt-7 w-full sm:w-auto" disabled={loading}>
        <Send className="h-4 w-4" />
        {loading ? "Abrindo o WhatsApp…" : "Enviar para a equipe pastoral"}
      </Button>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        Os pedidos são sigilosos e nunca são divulgados sem permissão.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
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

function Checkbox({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
      />
      <span>
        <span className="font-medium text-foreground">{label}</span>
        {description ? (
          <span className="block text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
