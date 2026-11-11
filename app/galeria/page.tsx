import type { Metadata } from "next";
import Image from "next/image";
import { Camera } from "lucide-react";
import { churchInfo } from "@/lib/church-info";
import galleryData from "@/content/gallery.json";

export const metadata: Metadata = {
  title: "Galeria",
  description: `Fotos dos cultos, eventos e momentos da ${churchInfo.name}.`,
};

// Para adicionar fotos: coloque o arquivo em public/images/galeria/ e
// acrescente { "src": "/images/galeria/foto.jpg", "caption": "..." } em
// content/gallery.json.
type Photo = { src: string; alt?: string; caption?: string };
const photos: Photo[] = (galleryData as { photos?: Photo[] }).photos ?? [];

export default function GaleriaPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Galeria
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Momentos da nossa igreja.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Cultos, encontros e eventos da {churchInfo.shortName}.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <Camera className="h-10 w-10 text-accent" />
            <p className="mt-4 font-serif text-2xl">Fotos em breve.</p>
            <p className="mt-2 text-muted-foreground">
              Estamos preparando a galeria. Volte logo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((p) => (
              <figure
                key={p.src}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <a href={p.src} target="_blank" rel="noreferrer">
                  <Image
                    src={p.src}
                    alt={p.alt || p.caption || "Foto da igreja"}
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition hover:scale-105"
                  />
                </a>
                {p.caption ? (
                  <figcaption className="p-3 text-sm text-muted-foreground">
                    {p.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
