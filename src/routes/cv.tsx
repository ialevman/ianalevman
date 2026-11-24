import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({ meta: [
    { title: "CV — Iana Levman" },
    { name: "description", content: "Curriculum vitae of artist Iana Levman, Tallinn, Estonia." },
    { property: "og:title", content: "CV — Iana Levman" },
    { property: "og:description", content: "Curriculum vitae of artist Iana Levman, Tallinn, Estonia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CV,
});

const EXHIBITIONS = [
  { year: "2026", what: "Film screening", where: "Sõprus Cinema, Tallinn, Estonia", note: "Broadcast on Jupiter TV / ETV+" },
  { year: "2025", what: "Solo exhibition", where: "Thule Koda, Kuressaare, Estonia" },
  { year: "2025", what: "Residency and group exhibition", where: "Psychiatric Hospital Center of Lisbon, Lisbon, Portugal" },
  { year: "2024", what: "Group exhibition", where: "Kunstraum Kreuzberg, Berlin, Germany" },
  { year: "2024", what: "Residency", where: "Ar.co and National Museum of Natural History and Science, Lisbon, Portugal" },
  { year: "2024", what: "Group exhibition", where: "Ar.co, Lisbon, Portugal" },
];

const EDUCATION = [
  { year: "2023–2025", what: "Ar.co, Centre for Art and Visual Communication", where: "Lisbon, Portugal" },
];

function Rows({ items }: { items: { year: string; what: string; where: string; note?: string }[] }) {
  return (
    <ul className="cv-rows">
      {items.map((r, i) => (
        <li key={i} className="cv-row">
          <span className="cv-year">{r.year}</span>
          <span>
            <span className="cv-what">{r.what}</span>
            <span className="cv-where">{r.where}</span>
            {r.note && <span className="cv-where">{r.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CV() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="gallery-lettering text-[32px] md:text-[44px]">CV</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">
        Iana Levman (b. 1991, Artem, Russia) is an artist based in Tallinn, Estonia. After relocating to Estonia, her
        ancestral homeland, her practice became increasingly focused on questions of belonging, memory and
        self-discovery. She works across drawing and video. Levman studied at Ar.co in Lisbon (2023–2025) and has
        exhibited in group shows in Portugal, Estonia and Germany. Her first solo exhibition took place in Estonia in 2025.
      </p>
      <h2 className="cv-heading">Exhibitions and residencies</h2>
      <Rows items={EXHIBITIONS} />
      <h2 className="cv-heading">Education</h2>
      <Rows items={EDUCATION} />
      <h2 className="cv-heading">Press</h2>
      <p className="text-lg">Jupiter · ERR, ETV+ Horizont, Radio 4, Voice of the Islands — <Link to="/press" className="underline underline-offset-4">see Press</Link>.</p>
    </section>
  );
}
