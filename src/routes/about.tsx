import { createFileRoute } from "@tanstack/react-router";
import { Carpet, PinnedHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Iana Levman" },
      { name: "description", content: "Iana Levman, artist working across drawing, photography and video. Tallinn, Estonia." },
      { property: "og:title", content: "About — Iana Levman" },
      { property: "og:description", content: "Iana Levman, artist working across drawing, photography and video. Tallinn, Estonia." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const TEXT = [
  "I grew up between two incompatible promises: that our lives were shaped by circumstances beyond our control, and that we could become anything we wanted.",
  "I was born in the Russian Far East, thousands of kilometres from my ancestors’ homeland. When I eventually arrived in Estonia, something happened that I still find hard to put into words. A sense of home appeared — not through familiarity, language or geography, but as a kind of physical recognition. It made me curious about how much of what we call personal really belongs to us.",
  "My generation inherited more than family histories. We grew up with the after-effects of collapsing political systems, shifting borders, economic uncertainty and one version of reality rapidly replacing another. For those of us raised in the post-Soviet world, identity was never fixed. We learned to build it, to speak through images, and to understand ourselves through the reactions of others. We are encouraged to discover who we are while constantly producing evidence of it.",
  "Our sense of self is shaped by relationships, inherited emotional patterns, unspoken family stories and experiences that sit outside conscious understanding. We carry impulses we can’t always explain and repeat behaviours we didn’t choose. Some of the ways we learned to protect ourselves can, over time, keep us from being fully present in our own lives — and noticing them is where change begins.",
  "I think of home as a state rather than a place: the possibility of living in one’s own body without constantly observing, correcting or defending oneself. It sounds ordinary, and that is exactly what interests me — how such a simple experience can be hard to reach, and how it can still be found.",
  "My attraction to found objects, worn interiors, handmade materials and what I call the borderline ugly comes from the same place. Their surfaces hold the traces of use, repetition, neglect and care. They have been changed by contact with the world, and they don’t need to explain or justify their existence.",
  "Working across drawing, photography and video, I explore the relationship between personal experience and inherited structures, between the image we construct and the body that lives behind it. I trace patterns of connection and separation, control and vulnerability, repetition and transformation.",
  "I want to understand how a person drifts away from themselves in the first place — and how it might be possible to belong without having to become someone else.",
];

function About() {
  return (
    <div data-artworks-start className="relative mt-12 pb-16">
      <Carpet opacity={0.85} />
      {/* 900px portrait + 2×20px padding, so the title starts exactly at the picture's left edge */}
      <PinnedHeading title="About" width="max-w-[940px]" />
      <div className="relative mx-auto max-w-5xl px-5 pt-6">
        {/* The same portrait twice, the right one mirrored, so the two look towards each other. */}
        <div className="about-diptych" aria-label="Portrait of Iana Levman">
          <img src="/media/about-portrait.webp" alt="Iana Levman" width={1200} height={1200} className="h-auto w-full" />
          <img src="/media/about-portrait.webp" alt="" aria-hidden width={1200} height={1200} className="h-auto w-full -scale-x-100" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-lg leading-relaxed md:text-xl">
          {TEXT.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}
