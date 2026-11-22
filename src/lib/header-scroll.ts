/** The stable gallery marker hands the top edge from the bottle to the artwork filters. */
export function shouldHideBottle(artworksTop: number | null) {
  return artworksTop !== null && artworksTop <= 0;
}

export function shouldRenderBottle(pathname: string) {
  return !pathname.startsWith("/works/");
}