import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <h1 className="text-4xl max-md:text-3xl font-light text-slate-900 mb-12">
        About
      </h1>

      <div className="float-right ml-8 mb-6 max-md:float-none max-md:ml-0 max-md:mb-8">
        <Image
          src="/images/at-surprise-glacier.jpg"
          alt="What I look like, when taking a selfie in front of a glacier"
          width={320}
          height={320}
          className="rounded"
        />
        <p className="text-xs text-slate-500 mt-2 italic">
          What I look like, when taking a selfie in front of a glacier
        </p>
      </div>

      <h2 className="text-2xl font-medium text-slate-900 mb-6">Bio</h2>

      <div className="text-[0.95rem] text-slate-700 leading-[1.85] font-light space-y-5">
        <p>
          John is a wordly, devilishly handsome, and cheeky internet software
          architect, with a strong background in designing and implementing
          scalable services, building maintainable code bases, crafting sensible
          user experiences.
        </p>
        <p>
          As douche-tastic as this will sound when you read it (in just a few
          more words; keep at it, chum!), he bills himself as a{" "}
          <em>humanistic technologist</em> because, really, all the software in
          the world is for naught, if not in service of people trying to get
          things done&mdash;for work, for pleasure, and for survival.
        </p>
        <p>
          He has devoted portions of his personal time since the earliest days
          of his career to working on Open Source Software, both contributing
          feedback and patches to existing projects, and as maintainer of a
          handful of his own small projects.
        </p>
        <p>
          John is proficient in speaking in the third person. And breaking the
          fourth wall (like this, see?).
        </p>
        <p>
          John&apos;s interests in language, culture, and travel have helped him
          develop a palpable sense of the global nature of the Internet and the
          multi-cultural sensibilities of its users worldwide.
        </p>
        <p>
          John Lianoglou holds a Bachelor&apos;s degree from the School of
          Visual Arts in New York, NY. Because you really care where he went to
          school.
        </p>
      </div>
    </section>
  );
}
