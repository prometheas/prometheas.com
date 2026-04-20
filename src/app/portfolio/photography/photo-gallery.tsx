"use client";

import Image from "next/image";
import { useState } from "react";

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightbox(i)}
            className="relative overflow-hidden rounded cursor-pointer group bg-[var(--bg-muted)] border-0 p-0"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl bg-transparent border-0 cursor-pointer"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <Image
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            width={photos[lightbox].width}
            height={photos[lightbox].height}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
