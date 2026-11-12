import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Camera, Images } from "lucide-react";
import { churchInfo } from "@/lib/church-info";
import { albums, getCover } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeria",
  description: `Fotos dos cultos, eventos e momentos da ${churchInfo.name}.`,
};

export default function GaleriaPage() {
  const withPhotos = albums.filter((a) => a.photos.length > 0);
  const comingSoon = albums.filter((a) => a.photos.length === 0);

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
            Encontros, celebrações e a vida em comunidade da {churchInfo.shortName}.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-20">
        {withPhotos.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <Camera className="h-10 w-10 text-accent" />
            <p className="mt-4 font-serif text-2xl">Fotos em breve.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {withPhotos.map((a) => {
              const cover = getCover(a);
              const portrait = (cover.height ?? 0) > (cover.width ?? 0);
              return (
                <Link
                  key={a.slug}
                  href={`/galeria/${a.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={cover.thumb || cover.src}
                      alt={a.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition duration-300 group-hover:scale-105 ${portrait ? "object-[center_25%]" : ""}`}
                    />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                      <Images className="h-3.5 w-3.5" />
                      {a.photos.length} {a.photos.length === 1 ? "foto" : "fotos"}
                      {a.videos?.length
                        ? ` · ${a.videos.length} ${a.videos.length === 1 ? "vídeo" : "vídeos"}`
                        : ""}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-2xl">{a.title}</h2>
                    {a.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {comingSoon.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-serif text-2xl">Em breve</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {comingSoon.map((a) => (
                <li
                  key={a.slug}
                  className="rounded-full border border-dashed border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  {a.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  );
}
