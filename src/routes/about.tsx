import { createFileRoute } from "@tanstack/react-router";
import { Carpet } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Iana Levman" },
      { name: "description", content: "Iana Levman, artist working with painting, works on paper and video. Tallinn, Estonia." },
      { property: "og:title", content: "About — Iana Levman" },
      { property: "og:description", content: "Iana Levman, artist working with painting, works on paper and video. Tallinn, Estonia." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="relative">
      <Carpet className="opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.2fr]">
        <h1 className="text-[40px] font-extrabold leading-[0.9] md:mt-10 md:text-[56px]">About</h1>
        <div className="space-y-6 text-xl">
          <p>Iana Levman — artist working with painting, works on paper and video. Tallinn, Estonia.</p>
          <hr className="lace-divider" />
        </div>
      </div>
    </div>
  );
}
