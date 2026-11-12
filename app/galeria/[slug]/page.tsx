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
          </p>
        </div>
      </section>

      <section className="container py-10 md:py-16">
        <PhotoGrid photos={album.photos} title={album.title} />
      </section>
    </>
  );
}
