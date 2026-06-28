import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"

type HubLink = { slug: string; label: string }

const HUBS: HubLink[] = [
  { slug: "agents", label: "에이전트" },
  { slug: "harness", label: "하네스" },
  { slug: "obsidian", label: "Obsidian" },
  { slug: "local-llm", label: "로컬 LLM" },
  { slug: "startup-ai", label: "창업 × AI" },
  { slug: "company-intel", label: "회사 인텔" },
  { slug: "products", label: "제품" },
  { slug: "projects", label: "프로젝트" },
  { slug: "ai-interior", label: "인테리어" },
  { slug: "about", label: "소개" },
]

const Nav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const base = pathToRoot(fileData.slug!)
  const cur = simplifySlug(fileData.slug!)
  return (
    <nav class={classNames(displayClass, "hub-nav")} aria-label="허브 내비게이션">
      {HUBS.map((h) => {
        const active = cur === h.slug || cur.startsWith(h.slug + "/")
        return (
          <a
            href={joinSegments(base, h.slug)}
            class={active ? "hub-nav-link active" : "hub-nav-link"}
            data-hub={h.slug}
          >
            {h.label}
          </a>
        )
      })}
    </nav>
  )
}

Nav.css = `
.hub-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.55rem;
  align-items: center;
  margin: 0;
}
.hub-nav-link {
  font-family: var(--codeFont);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: var(--gray);
  background: none;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  white-space: nowrap;
  font-weight: 500;
}
.hub-nav-link:hover {
  color: var(--secondary);
  border-color: var(--lightgray);
}
.hub-nav-link.active {
  color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
}
.hub-nav-link:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .hub-nav-link { transition: none; }
}
`

export default (() => Nav) satisfies QuartzComponentConstructor
