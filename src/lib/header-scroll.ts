/**
 * The stable section marker hands the top edge from the bottle to the pinned section heading.
 * The bottle goes as soon as the heading reaches the bottle's lower edge, so the two never overlap.
 */
export function shouldHideBottle(artworksTop: number | null, bottleHeight = 0) {
  return artworksTop !== null && artworksTop <= bottleHeight;
}

export function shouldRenderBottle(pathname: string) {
  return !pathname.startsWith("/works/");
}