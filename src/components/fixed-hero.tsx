"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function FixedHero() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    function measure() {
      const spacer = spacerRef.current;
      if (spacer) setTopOffset(spacer.offsetTop);
    }

    function handleScroll() {
      const spacer = spacerRef.current;
      if (!spacer) return;
      const h = spacer.offsetHeight;
      if (h === 0) return;

      // Fade starts immediately on scroll, reaches max translucency at the same point as before
      // Ease-out curve (sqrt) front-loads the fade so it's perceptible from the first pixels
      const fadeEnd = spacer.offsetTop + h / 6;
      const linear = Math.min(Math.max(window.scrollY, 0) / fadeEnd, 1);
      const progress = Math.sqrt(linear);
      setOpacity(1 - progress * 0.8);
    }

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      {/* Fixed hero image — pinned at its original position below the header */}
      <div
        className="fixed inset-x-0 -z-1 leading-[0] text-[0]"
        style={{ opacity, top: topOffset }}
      >
        <Image
          src="/images/hero-hand.png"
          alt="Open hand, palm up — the Promethean offering"
          width={1920}
          height={1200}
          priority
          className="w-full h-auto block dark:opacity-[0.42]"
        />
      </div>

      {/* Spacer to preserve layout height */}
      <div ref={spacerRef} className="w-full aspect-[1920/1200]" />
    </>
  );
}
