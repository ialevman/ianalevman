/** Press about Iana Levman — single source for the Press page. Images are the outlets' own share previews. */
export type PressItem = {
  outlet: string;
  kind: string;
  date: string;
  headline: string;
  /** English gloss of the headline when it is not in English. */
  translation?: string;
  lead: string;
  image: string;
  url: string;
  lang: "en" | "et" | "ru";
};

export const PRESS: PressItem[] = [
  {
    outlet: "Jupiter · ERR",
    kind: "Film broadcast",
    date: "2026",
    headline: "Home Is a Place I've Never Been",
    lead: "A documentary about a woman searching for her roots and a sense of belonging: Iana grew up in Vladivostok, far from Estonia, yet her great-grandmother's stories of Saaremaa stayed with her.",
    image: "https://s.err.ee/photo/crop/2026/04/09/3296481h9f29t16.jpg",
    url: "https://jupiter.err.ee/1609988167/kodu-on-koht-kus-ma-kunagi-olnud-ei-ole",
    lang: "en",
  },
  {
    outlet: "ETV+ · Horizont",
    kind: "TV feature",
    date: "January 2026",
    headline: "Home Is a Place I've Never Been",
    lead: "From the Pacific coast to a distant island in the Baltic Sea: photographer Masha Bakhtina on her first documentary, in which Vladivostok-born artist Iana Levman searched for her roots on Saaremaa.",
    image: "https://s.err.ee/photo/crop/2026/01/07/3147967h4b3bt16.jpg",
    url: "https://jupiter.err.ee/1609904605/dom-v-kotorom-ja-nikogda-ne-byla",
    lang: "en",
  },
  {
    outlet: "Radio 4 · ERR",
    kind: "Radio",
    date: "January 2026",
    headline: "How Iana from Vladivostok Found Her Relatives on Saaremaa",
    lead: "A Radio 4 segment (in Russian) on how Iana traced her family on Saaremaa — the story behind the film.",
    image: "https://s.err.ee/photo/crop/2026/01/06/3146197h960at37.jpg",
    url: "https://services.err.ee/media/embed/72beceed7202f069f0426f6c18a8e6a9",
    lang: "en",
  },
  {
    outlet: "Voice of the Islands · Postimees",
    kind: "Newspaper",
    date: "27 October 2025",
    headline: "Home Can Be a Place You've Never Been",
    lead: "On Saturday, Masha Bakhtina showed her newly finished documentary “Home Is a Place I've Never Been” to invited guests at Thule Koda in Kuressaare.",
    image: "https://f9.pmo.ee/ZlwmkWN_yIAvdfjfNUMvwG56pSo=/1200x630/filters:focal(1809x935:3319x3165):format(webp)/nginx/o/2025/10/26/17240829t1hca1f.jpg",
    url: "https://saartehaal.postimees.ee/8350591/kodu-voib-olla-koht-kus-sa-kunagi-kainud-ei-ole",
    lang: "en",
  },
];
