import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug } from "../util/path"
import { HUBS } from "../hubs"

// 폴더 랜딩(대분류/중분류 index)에서 직속 자식을 카드로 렌더한다.
//  - 자식 폴더(하위 분류) → "분류" 카드(폴더 느낌, N개 문서)
//  - 자식 노트(문서)       → "문서" 카드(납작, 읽기 →)
// 색은 최상위 대분류(hubs.json) 색을 계승. 홈/일반 노트에서는 null.
function clip(s: string, n = 86): string {
  s = (s ?? "").replace(/\s+/g, " ").trim()
  return s.length > n ? s.slice(0, n - 1) + "…" : s
}

const CategoryCards: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const slug = fileData.slug as string
  if (!slug || slug === "index" || !slug.endsWith("/index")) return null
  const folder = slug.slice(0, -"/index".length)
  const depth = folder.split("/").length
  const accent = HUBS.find((h) => h.slug === folder.split("/")[0])?.color ?? "var(--secondary)"

  const folders: { slug: string; title: string; desc: string; count: number }[] = []
  const docs: { slug: string; title: string; desc: string }[] = []
  const seen = new Set<string>()
  for (const f of allFiles) {
    const s = f.slug as string
    if (!s || s === slug || !s.startsWith(folder + "/")) continue
    const segs = s.slice(folder.length + 1).split("/")
    const fm = (f.frontmatter ?? {}) as { title?: string; summary?: string }
    if (segs.length === 1 && segs[0] !== "index") {
      docs.push({ slug: s, title: fm.title ?? segs[0], desc: clip(fm.summary ?? f.description ?? "") })
    } else if (segs.length === 2 && segs[1] === "index") {
      const sub = folder + "/" + segs[0]
      if (seen.has(sub)) continue
      seen.add(sub)
      const count = allFiles.filter((g) => {
        const gs = g.slug as string
        return (
          !!gs &&
          gs.startsWith(sub + "/") &&
          !gs.endsWith("/index") &&
          gs.slice(sub.length + 1).split("/").length === 1
        )
      }).length
      folders.push({ slug: s, title: fm.title ?? segs[0], desc: clip(fm.summary ?? f.description ?? ""), count })
    }
  }
  if (folders.length === 0 && docs.length === 0) return null

  const link = (t: string) => resolveRelative(slug as FullSlug, t as FullSlug)

  return (
    <div class={`cat-cards depth-${depth}`}>
      {folders.length > 0 ? (
        <nav class="cat-grid is-folders" aria-label="하위 분류">
          {folders.map((c) => (
            <a class="cat-card is-folder" href={link(c.slug)} style={`--bar:${accent}`}>
              <span class="cat-kind" aria-hidden="true">분류</span>
              <span class="cat-title">{c.title}</span>
              {c.desc ? <span class="cat-desc">{c.desc}</span> : null}
              <span class="cat-foot">
                <span class="cat-count">{c.count}개 문서</span>
                <span class="cat-arrow" aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </nav>
      ) : null}
      {docs.length > 0 ? (
        <nav class="cat-grid is-docs" aria-label="문서">
          {docs.map((c) => (
            <a class="cat-card is-doc" href={link(c.slug)} style={`--bar:${accent}`}>
              <span class="cat-kind" aria-hidden="true">문서</span>
              <span class="cat-title">{c.title}</span>
              {c.desc ? <span class="cat-desc">{c.desc}</span> : null}
              <span class="cat-foot">
                <span class="cat-read">읽기</span>
                <span class="cat-arrow" aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

CategoryCards.css = `
.cat-cards { margin: 1.6rem 0 0.5rem; display: flex; flex-direction: column; gap: 1.4rem; }
.cat-grid { display: grid; gap: 0.9rem; }
.cat-grid.is-folders { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.cat-grid.is-docs { grid-template-columns: repeat(auto-fill, minmax(244px, 1fr)); }

.cat-card {
  --c: var(--bar, var(--secondary));
  position: relative; display: flex; flex-direction: column; gap: 0.32rem; min-width: 0;
  text-decoration: none; color: var(--darkgray); font-weight: 400;
  border-radius: 14px;
  background: color-mix(in srgb, var(--c) 6%, var(--light));
  border: 1px solid color-mix(in srgb, var(--c) 22%, var(--lightgray));
  transition: transform .2s cubic-bezier(.2,.7,.2,1), box-shadow .2s ease, border-color .2s ease, background .2s ease;
}
.cat-card .cat-kind {
  align-self: flex-start; font-family: var(--codeFont);
  font-size: .6rem; letter-spacing: .14em; text-transform: uppercase;
  color: color-mix(in srgb, var(--c) 55%, var(--dark));
  background: color-mix(in srgb, var(--c) 18%, var(--light));
  padding: .08rem .5rem; border-radius: 999px;
}
.cat-card .cat-title { font-weight: 600; color: var(--dark); word-break: keep-all; overflow-wrap: anywhere; line-height: 1.3; }
.cat-card .cat-desc { font-size: .82rem; color: var(--gray); line-height: 1.45; word-break: keep-all; }
.cat-card .cat-foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; padding-top: .4rem; }
.cat-card .cat-count, .cat-card .cat-read { font-size: .72rem; font-weight: 600; color: color-mix(in srgb, var(--c) 50%, var(--dark)); }
.cat-card .cat-arrow { font-family: var(--codeFont); color: var(--c); opacity: 0; transform: translateX(-4px); transition: opacity .2s ease, transform .2s ease; }
.cat-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--c) 50%, var(--lightgray));
  background: color-mix(in srgb, var(--c) 11%, var(--light));
  box-shadow: 0 12px 26px -16px color-mix(in srgb, var(--c) 75%, transparent);
}
.cat-card:hover .cat-arrow { opacity: 1; transform: translateX(0); }

/* 중분류(분류) 카드 = 크고 입체적: 굵은 좌측 바 + 겹친 종이 그림자 */
.cat-card.is-folder {
  padding: 1.05rem 1.2rem 0.95rem 1.25rem;
  border-left: 5px solid var(--c);
  box-shadow: 5px 5px 0 -1px color-mix(in srgb, var(--c) 13%, var(--light));
}
.cat-card.is-folder .cat-title { font-size: 1.05rem; }
.cat-card.is-folder:hover {
  box-shadow: 0 14px 28px -16px color-mix(in srgb, var(--c) 75%, transparent),
              5px 5px 0 -1px color-mix(in srgb, var(--c) 18%, var(--light));
}

/* 소분류(문서) 카드 = 작고 납작: 얇은 좌측 바, 그림자 없음 */
.cat-card.is-doc {
  padding: 0.82rem 1rem 0.78rem 1rem;
  border-left: 3px solid var(--c);
}
.cat-card.is-doc .cat-title { font-size: 0.95rem; }
.cat-card.is-doc .cat-kind { background: transparent; padding-left: 0; color: color-mix(in srgb, var(--c) 45%, var(--gray)); }

@media (prefers-reduced-motion: reduce) {
  .cat-card, .cat-card .cat-arrow { transition: none; }
  .cat-card:hover { transform: none; }
}
`

export default (() => CategoryCards) satisfies QuartzComponentConstructor
