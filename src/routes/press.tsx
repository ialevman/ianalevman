import { createFileRoute } from "@tanstack/react-router";
import { PRESS } from "@/data/press";

export const Route = createFileRoute("/press")({
  head: () => ({ meta: [
    { title: "Press — Iana Levman" },
    { name: "description", content: "Press and publications about the work of artist Iana Levman." },
    { property: "og:title", content: "Press — Iana Levman" },
    { property: "og:description", content: "Press and publications about the work of artist Iana Levman." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Press,
});

/** Each publication shown as a newspaper cutting: outlet and date as the kicker, the outlet's own preview image, headline, lead. */
function Press() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="gallery-lettering text-[32px] md:text-[44px]">Press</h1>
      <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {PRESS.map((p, i) => (
          <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" lang={p.lang}
            className={`press-clipping group block ${i % 2 ? "md:mt-16 md:rotate-[0.8deg]" : "md:-rotate-[0.6deg]"}`}>
            <div className="press-kicker"><span>{p.outlet}</span><span>{p.date}</span></div>
            <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer" className="press-image" />
            <p className="press-kind">{p.kind}</p>
            <h2 className="press-headline group-hover:underline">{p.headline}</h2>
            {p.translation && <p className="press-translation" lang="en">{p.translation}</p>}
            <p className="press-lead" lang="en">{p.lead}</p>
            <span className="press-more" lang="en">Read / watch →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
