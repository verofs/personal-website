import type { LocalizedText } from "./translations";

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: LocalizedText;
  category?: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const defaultGalleryPhotos: GalleryPhoto[] = [
  {
    id: "valencia",
    src: "/images/gallery/valencia.svg",
    caption: {
      en: "Valencia roots",
      it: "Radici a Valencia",
      es: "Raices en Valencia",
    },
    category: "travel",
    aspect: "landscape",
  },
  {
    id: "rome",
    src: "/images/gallery/rome.svg",
    caption: {
      en: "Rome chapter",
      it: "Capitolo Roma",
      es: "Capitulo Roma",
    },
    category: "travel",
    aspect: "portrait",
  },
  {
    id: "unlv",
    src: "/images/gallery/unlv.svg",
    caption: {
      en: "University of Nevada, Las Vegas leadership",
      it: "Leadership a University of Nevada, Las Vegas",
      es: "Liderazgo en University of Nevada, Las Vegas",
    },
    category: "leadership",
    aspect: "square",
  },
  {
    id: "exchange",
    src: "/images/gallery/exchange.svg",
    caption: {
      en: "The Exchange event",
      it: "Evento The Exchange",
      es: "Evento The Exchange",
    },
    category: "community",
    aspect: "landscape",
  },
];
