import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { HUBS } from "../hubs"

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
            style={`--hub:${h.color}`}
          >
            {h.nav}
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
  gap: 0.45rem 0.5rem;
  align-items: center;
  margin: 0;
}
.hub-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--codeFont);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  font-weight: 600;
  color: var(--darkgray);
  background: color-mix(in srgb, var(--hub, var(--secondary)) 8%, transparent);
  padding: 0.26rem 0.7rem 0.26rem 0.62rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--hub, var(--secondary)) 18%, transparent);
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;
  white-space: nowrap;
}
.hub-nav-link::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hub, var(--secondary));
  flex-shrink: 0;
  transition: transform 0.15s ease;
}
.hub-nav-link:hover {
  color: var(--dark);
  background: color-mix(in srgb, var(--hub, var(--secondary)) 18%, transparent);
  border-color: color-mix(in srgb, var(--hub, var(--secondary)) 45%, transparent);
  transform: translateY(-1px);
}
.hub-nav-link:hover::before {
  transform: scale(1.4);
}
.hub-nav-link.active {
  color: var(--dark);
  background: color-mix(in srgb, var(--hub, var(--secondary)) 26%, transparent);
  border-color: color-mix(in srgb, var(--hub, var(--secondary)) 55%, transparent);
}
.hub-nav-link:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .hub-nav-link,
  .hub-nav-link::before {
    transition: none;
  }
  .hub-nav-link:hover {
    transform: none;
  }
}
`

export default (() => Nav) satisfies QuartzComponentConstructor
