<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Artwork content lives in src/data/works.ts (single source for gallery, detail and Acquire) — keeps adding works a one-file change.
- Texture utilities (glass, lace-*, carpet-bg) live in src/styles.css — design stays centralized.
- Keep bottle lettering as live links over a blank-label image, with placement in global CSS — navigation stays accessible and editable independently of the photo.
- Keep the bottle header's document-space height stable and hide its scene when the stable Artworks section marker reaches viewport top; pin the gallery heading and filters independently — avoids page jumps and scroll-threshold oscillation.
- Use the Button lettering variant for unframed text commands over artwork; feature-specific type and contrast stay in global CSS — keeps commands component-compliant without decorative boxes.
- Artwork detail routes omit the shared bottle header and use a separate whole-bottle image inside a Button-based Acquire trigger; detail and acquisition typography share gallery-lettering — keeps the artwork unoccluded and avoids reusing the sliced header silhouette for purchases.
- Keep CV and Press as distinct content routes and leave unprovided artist materials and social destinations unset — avoids invented biography and misdirected external links.
