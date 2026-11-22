import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({ meta: [
    { title: "CV — Iana Levman" },
    { name: "description", content: "Curriculum vitae of artist Iana Levman, Tallinn, Estonia." },
    { property: "og:title", content: "CV — Iana Levman" },
    { property: "og:description", content: "Curriculum vitae of artist Iana Levman, Tallinn, Estonia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <section className="gallery-lettering mx-auto max-w-6xl px-5 py-16"><h1 className="text-[32px] md:text-[44px]">CV</h1></section>,
});