"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type Screenshot = {
  alt: string;
  label: string;
  src: string;
};

type EireneScreenshotCarouselProps = {
  screenshots: Screenshot[];
};

const carouselMotionClass =
  "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function EireneScreenshotCarousel({
  screenshots,
}: EireneScreenshotCarouselProps) {
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
    <section className="py-20 max-md:py-12">
      <div className="mx-auto flex max-w-[800px] flex-col items-center gap-10 px-[4.5rem] max-md:px-6">
        <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
          The practice
        </p>

        <div className="grid w-full grid-cols-3 justify-items-center gap-6 max-md:hidden">
          {screenshots.map((screenshot) => (
            <figure
              key={screenshot.alt}
              className="flex flex-col items-center gap-3"
            >
              <div className="overflow-hidden rounded-[32px] bg-[var(--bg-muted)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="block w-full"
                />
              </div>
              <figcaption className="text-center text-[12px] font-light text-[var(--text-muted)]">
                {screenshot.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="hidden w-full flex-col gap-5 max-md:flex">
          <div className="-mx-6 overflow-hidden px-6" ref={emblaRef}>
            <div className="-ml-3 flex touch-pan-y">
              {screenshots.map((screenshot, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={screenshot.alt}
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
                          src={screenshot.src}
                          alt={screenshot.alt}
                          className="block w-full"
                        />
                      </div>
                      <figcaption className="text-center text-[12px] font-light text-[var(--text-muted)]">
                        {screenshot.label}
                      </figcaption>
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:border-[var(--border-subtle)] disabled:text-[var(--text-muted)]"
              aria-label="Show previous screenshot"
            >
              <span aria-hidden="true">&larr;</span>
            </button>

            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`screenshot-dot-${index}`}
                    type="button"
                    onClick={() => scrollTo(index)}
                    className="inline-flex h-8 w-8 items-center justify-center"
                    aria-label={`Show screenshot ${index + 1}`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={`block h-[6px] rounded-full transition-[background-color,width] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isSelected
                          ? "w-5 bg-[var(--accent)]"
                          : "w-[6px] bg-[var(--border)]"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:border-[var(--border-subtle)] disabled:text-[var(--text-muted)]"
              aria-label="Show next screenshot"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
