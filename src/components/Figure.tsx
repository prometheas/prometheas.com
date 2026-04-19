import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || caption || ""}
        width={800}
        height={500}
        className="w-full h-auto rounded"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
