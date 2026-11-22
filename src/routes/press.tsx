import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/press")({
  head: () => ({ meta: [
    { title: "Press — Iana Levman" },
    { name: "description", content: "Press and publications about the work of artist Iana Levman." },
    { property: "og:title", content: "Press — Iana Levman" },
    { property: "og:description", content: "Press and publications about the work of artist Iana Levman." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <section className="gallery-lettering mx-auto max-w-6xl px-5 py-16"><h1 className="text-[32px] md:text-[44px]">Press</h1></section>,
});