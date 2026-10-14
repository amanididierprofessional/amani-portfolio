<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep shared navigation and footer in the root shell, with separate content routes for work, about, playground, and contact so every section is directly addressable.
- Keep project data and metadata helpers in the browser-safe portfolio module; verified repository links are static so browsing needs no external API.
- Store supplied media through asset pointers and generated illustrations as imported images; distinguish concept artwork from actual project screenshots and travel photos.
- Contact uses the supplied public social links rather than inventing an email address or collecting messages without a delivery service.
