import type { Metadata } from "next";
import { PhotoGallery } from "./PhotoGallery";

export const metadata: Metadata = { title: "Photography" };

const photos = [
  { src: "/images/photography/photo-1.jpg", alt: "Photography 1", width: 960, height: 720 },
  { src: "/images/photography/photo-2.jpg", alt: "Photography 2", width: 960, height: 720 },
  { src: "/images/photography/photo-3.jpg", alt: "Photography 3", width: 960, height: 720 },
  { src: "/images/photography/photo-4.jpg", alt: "Photography 4", width: 960, height: 720 },
  { src: "/images/photography/photo-5.jpg", alt: "Photography 5", width: 960, height: 720 },
  { src: "/images/photography/photo-6.jpg", alt: "Photography 6", width: 640, height: 640 },
];

export default function PhotographyPage() {
  return (
    <section className="max-w-[1200px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <h1 className="text-4xl max-md:text-3xl font-light text-slate-900 mb-12">
        Photography
      </h1>
      <PhotoGallery photos={photos} />
    </section>
  );
}
