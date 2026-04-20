import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
  bgLight = false,
}: {
  src: string;
  alt?: string;
  caption?: string;
  bgLight?: boolean;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || caption || ""}
        width={800}
        height={500}
        className={`w-full h-auto rounded dark:border dark:border-[var(--border)] ${bgLight ? "dark:bg-white" : ""}`}
      />
      {caption && (
        <figcaption className="text-sm text-[var(--text-secondary)] mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
