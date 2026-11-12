import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { churchInfo } from "@/lib/church-info";
import { albums, getAlbum } from "@/lib/gallery";
import { PhotoGrid } from "@/components/sections/photo-grid";

type Params = { slug: string };

export function generateStaticParams() {
  const list = albums.filter((a) => a.photos.length > 0).map((a) => ({ slug: a.slug }));
  return list.length > 0 ? list : [{ slug: "nenhum" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) return {};
  return {
    title: `${album.title} · Galeria`,
    description: album.description || `Fotos: ${album.title} — ${churchInfo.name}.`,
  };
}

export default async function AlbumPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album || album.photos.length === 0) notFound();
  const videos = album.videos ?? [];

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 md:py-16">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Todos os álbuns
          </Link>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">
            {album.title}
          </h1>
          {album.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {album.description}
            </p>
          ) : null}
          <p className="mt-3 text-sm text-muted-foreground">
            {album.photos.length} {album.photos.length === 1 ? "foto" : "fotos"}
            {videos.length > 0
              ? ` · ${videos.length} ${videos.length === 1 ? "vídeo" : "vídeos"}`
              : ""}
          </p>
        </div>
      </section>

      {videos.length > 0 ? (
        <section className="container pt-10 md:pt-16">
          <h2 className="font-serif text-2xl">Vídeos</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <figure
                key={v.src}
                className="overflow-hidden rounded-xl border border-border bg-black"
              >
                <video
                  src={`${v.src}#t=0.1`}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-[9/16] max-h-[70vh] w-full bg-black object-contain"
                  aria-label={v.caption || `${album.title} — vídeo ${i + 1}`}
                />
                {v.caption ? (
                  <figcaption className="bg-card p-3 text-sm text-muted-foreground">
                    {v.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container py-10 md:py-16">
        {videos.length > 0 ? <h2 className="mb-5 font-serif text-2xl">Fotos</h2> : null}
        <PhotoGrid photos={album.photos} title={album.title} />
      </section>
    </>
  );
}
