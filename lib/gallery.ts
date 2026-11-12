import data from "@/content/gallery.json";

// Álbuns da Galeria. Para adicionar fotos, inclua-as em "photos" do álbum em
// content/gallery.json (foto em public/images/galeria/<slug>/ e miniatura
// "thumb-<nome>"). Álbuns sem fotos aparecem como "em breve".
export type GalleryPhoto = {
  src: string;
  thumb?: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type GalleryVideo = {
  src: string;
  poster?: string;
  caption?: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  photos: GalleryPhoto[];
  videos?: GalleryVideo[];
};

export const albums: GalleryAlbum[] = (data as { albums?: GalleryAlbum[] }).albums ?? [];

export function getAlbum(slug: string): GalleryAlbum | undefined {
  return albums.find((a) => a.slug === slug);
}
