"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export type CarouselImage = {
  alt: string;
  label?: string;
  src: string;
};

type ScreenshotCarouselProps = {
  images: CarouselImage[];
};

const carouselMotionClass =
  "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function ScreenshotCarousel({ images }: ScreenshotCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
  });
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollNext(emblaApi.canScrollNext());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      syncCarouselState();
    };

    onInit();
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", syncCarouselState);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid w-full grid-cols-3 justify-items-center gap-6 max-md:hidden">
        {images.map((image) => (
          <figure key={image.alt} className="flex flex-col items-center gap-3">
            <div className="overflow-hidden rounded-[32px] bg-[var(--bg-muted)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} className="block w-full" />
            </div>
            {image.label ? (
              <figcaption className="text-center text-[12px] font-light text-[var(--text-muted)]">
                {image.label}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <div className="hidden w-full flex-col gap-5 max-md:flex">
        <div className="-mx-6 overflow-hidden px-6" ref={emblaRef}>
          <div className="-ml-3 flex touch-pan-y">
            {images.map((image, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={image.alt}
                  className="min-w-0 shrink-0 basis-[19rem] pl-3"
                >
                  <figure
                    className={`mx-auto flex w-full max-w-[18rem] translate-y-0 flex-col items-center gap-3 ${carouselMotionClass} ${
                      isSelected ? "opacity-100" : "translate-y-1 opacity-60"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[32px] bg-[var(--bg-muted)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="block w-full"
                      />
                    </div>
                    {image.label ? (
                      <figcaption className="text-center text-[12px] font-light text-[var(--text-muted)]">
                        {image.label}
                      </figcaption>
                    ) : null}
                  </figure>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-[color,border-color,opacity] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-default disabled:border-[var(--border-subtle)] disabled:text-[var(--text-muted)] disabled:opacity-10"
            aria-label="Show previous image"
          >
            <span aria-hidden="true">&larr;</span>
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => {
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={`carousel-dot-${index}`}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className="group inline-flex h-8 w-8 items-center justify-center cursor-pointer"
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`block h-[6px] rounded-full transition-[background-color,width] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isSelected
                        ? "w-5 bg-[var(--accent)]"
                        : "w-[6px] bg-[var(--border)] group-hover:bg-[var(--accent)] group-focus-visible:bg-[var(--accent)]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-[color,border-color,opacity] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-default disabled:border-[var(--border-subtle)] disabled:text-[var(--text-muted)] disabled:opacity-10"
            aria-label="Show next image"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
