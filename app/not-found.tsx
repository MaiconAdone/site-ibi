import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Erro 404
      </p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">
        Página não encontrada.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        O endereço pode ter mudado ou não existe mais.
      </p>
      <Button asChild variant="accent" size="lg" className="mt-8">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </section>
  );
}
