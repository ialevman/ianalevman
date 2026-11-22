import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

export type Work = {
  slug: string; title: string; year: number; medium: string; size: string;
  category: Category;
  /** Stripe Payment Link URL; leave empty until created. */
  paymentLink?: string;
  price: string; available: boolean; image: string; w: number; h: number; text: string;
};

export const ARTIST = "Iana Levman";

export const CATEGORIES = ["Video", "Paintings", "Works on Paper"] as const;
export type Category = (typeof CATEGORIES)[number];

export const works: Work[] = [
  { slug: "kitchen-at-dusk", category: "Paintings", title: "Kitchen at Dusk", year: 2025, medium: "Oil on linen", size: "100 × 80 cm", price: "€4,200", available: true, image: w1, w: 896, h: 1120, text: "A room remembered by the colour of its walls rather than its furniture." },
  { slug: "two-winters", category: "Paintings", title: "Two Winters", year: 2024, medium: "Acrylic and chalk on canvas", size: "90 × 90 cm", price: "€3,600", available: true, image: w2, w: 1024, h: 1024, text: "Two seasons overlapping, neither willing to leave." },
  { slug: "thread", category: "Works on Paper", title: "Thread", year: 2025, medium: "Ink and oil on paper", size: "42 × 30 cm", price: "€2,900", available: true, image: w3, w: 864, h: 1152, text: "Almost nothing, held together by one line." },
  { slug: "sideboard-light", category: "Video", title: "Sideboard Light", year: 2023, medium: "Single-channel video, 6 min", size: "Edition of 3", price: "", available: false, image: w4, w: 1152, h: 864, text: "Light passing through something thick and cold." },
  { slug: "the-wall-above-the-bed", category: "Paintings", title: "The Wall Above the Bed", year: 2024, medium: "Oil on canvas", size: "100 × 80 cm", price: "€4,800", available: true, image: w5, w: 896, h: 1120, text: "Warm, heavy, a little too close." },
  { slug: "breath-on-a-window", category: "Works on Paper", title: "Breath on a Window", year: 2025, medium: "Graphite on paper", size: "50 × 50 cm", price: "€2,400", available: true, image: w6, w: 1024, h: 1024, text: "Fog, and the faint pattern of something knitted." },
];
