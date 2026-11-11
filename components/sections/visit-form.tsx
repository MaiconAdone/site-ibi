"use client";

import { sendViaWhatsApp } from "@/lib/submit";
import { useMemo, useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpIcon } from "@/components/ui/help-icon";
import { churchInfo, type Service } from "@/lib/church-info";
import { dayToDow } from "@/lib/calendar-data";


function nextServiceOptions(
  services: readonly Service[],
  count: number,
  from: Date = new Date()
): { value: string; label: string }[] {
  const active = services.filter(
    (s) => s.day && s.time && dayToDow(s.day) !== undefined
  );
  // Fall back to next Sundays if no services are configured.
  if (active.length === 0) {
    const out: { value: string; label: string }[] = [];
    const d = new Date(from);
    while (out.length < count) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0)
        out.push({
          value: d.toISOString().slice(0, 10),
          label: d.toLocaleDateString("pt-BR", { weekday: "long", month: "long", day: "numeric" }),
        });
    }
    return out;
  }

  const multipleServices = active.length > 1;
  const instances: { date: Date; service: Service }[] = [];
  const d = new Date(from);
  // Scan 10 weeks ahead — enough to collect `count` instances for any schedule.
  for (let i = 0; i < 70 && instances.length < count * active.length; i++) {
    d.setDate(d.getDate() + 1);
    for (const s of active) {
      if (d.getDay() === dayToDow(s.day))
        instances.push({ date: new Date(d), service: s });
    }
  }
  // Sort chronologically, then by service time within the same day.
  instances.sort((a, b) =>
    a.date.getTime() !== b.date.getTime()
      ? a.date.getTime() - b.date.getTime()
      : a.service.time.localeCompare(b.service.time)
  );

  return instances.slice(0, count).map(({ date, service }) => {
    const dateLabel = date.toLocaleDateString("pt-BR", {
      weekday: "long", month: "long", day: "numeric",
    });
    const label = multipleServices
      ? `${dateLabel} · ${service.name || service.time}`
      : dateLabel;
    return {
      value: `${date.toISOString().slice(0, 10)}|${service.time}`,
      label,
    };
  });
}

export function VisitForm() {
  const serviceOptions = useMemo(() => nextServiceOptions(churchInfo.services, 8), []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    adults: "1",
    kids: "0",
    kidsAges: "",
    visit: serviceOptions[0]?.value ?? "",
    notes: "",
  });

  const hasKids = Number(form.kids) > 0;

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
      sendViaWhatsApp("visit", form);
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
        <h3 className="mt-5 font-serif text-2xl">
          Mal podemos esperar para conhecer você.
        </h3>
        <p className="mt-3 text-muted-foreground">
          Sua mensagem foi aberta no WhatsApp — é só enviar por lá. Se
          precisar de algo,{" "}
          <a className="text-accent hover:underline" href={churchInfo.emailHref}>
            mande um e-mail
          </a>{" "}
          ou ligue para{" "}
          <a className="text-accent hover:underline" href={churchInfo.phoneHref}>
            {churchInfo.phone}
          </a>
          .
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
          help="Para sabermos quem receber no culto."
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
          help="Usaremos só para falar com você antes da visita."
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
          label="Quantos adultos?"
          help="Quantos adultos virão, incluindo você."
        >
          <Select
            value={form.adults}
            onChange={(v) => update("adults", v)}
            options={["1", "2", "3", "4", "5", "6+"]}
          />
        </Field>

        <Field
          label="Quantas crianças?"
          help="Ajuda o ministério infantil a preparar a turma de cada criança."
        >
          <Select
            value={form.kids}
            onChange={(v) => update("kids", v)}
            options={["0", "1", "2", "3", "4", "5+"]}
          />
        </Field>

        {hasKids ? (
          <Field
            label="Idade das crianças"
            className="sm:col-span-2"
            help="Usamos a idade para encaminhar cada criança à turma certa."
          >
            <Input
              value={form.kidsAges}
              onChange={(e) => update("kidsAges", e.target.value)}
              placeholder="ex.: 3, 6 e 9"
            />
          </Field>
        ) : null}

        <Field
          label="Qual culto?"
          className="sm:col-span-2"
          help="Escolha o culto que pretende visitar. Ainda não sabe? Sem problema."
        >
          <Select
            value={form.visit}
            onChange={(v) => update("visit", v)}
            options={serviceOptions}
            extraOption={{ value: "unsure", label: "Ainda não sei" }}
          />
        </Field>

        <Field
          label="Algo que devemos saber?"
          hint="Alergias, acessibilidade, dúvidas — totalmente opcional."
          className="sm:col-span-2"
        >
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="flex w-full rounded-md border border-input bg-card px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Qualquer coisa — adoramos perguntas."
          />
        </Field>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : null}
      <Button type="submit" variant="accent" size="lg" className="mt-7 w-full sm:w-auto" disabled={loading}>
        <Send className="h-4 w-4" />
        {loading ? "Abrindo o WhatsApp…" : "Avisar que vou visitar"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Usaremos seus dados só para recebê-lo bem — nunca para listas de envio.
      </p>
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
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

type SelectOption = string | { value: string; label: string };

function Select({
  value,
  onChange,
  options,
  extraOption,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  extraOption?: { value: string; label: string };
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const l = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
      {extraOption ? (
        <option value={extraOption.value}>{extraOption.label}</option>
      ) : null}
    </select>
  );
}
