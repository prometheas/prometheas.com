import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 450}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
