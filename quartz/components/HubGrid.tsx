import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import { HUBS } from "../hubs"

// 홈(index) 히어로 아래에 렌더되는 허브 카드 그리드.
// quartz/hubs.ts 의 HUBS 단일 소스를 map 하여 카드를 만든다.
// 마크업/클래스(.hub-grid / .hub-card.internal / data-hub / 01~10 번호 /
// hub-ko · hub-en · hub-desc / 좌측 컬러 bar)는 기존 홈과 동일.
// 카드 링크는 Quartz 의 다른 internal 링크와 같은 방식(상대경로)으로 렌더되어
// 빌드 후 ./<slug> + data-slug 로 변환된다.
const HubGrid: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const base = pathToRoot(fileData.slug!)
  return (
    <>
      <nav class="hub-grid" aria-label="지식 허브">
        {HUBS.map((hub, i) => (
          <a
            class="hub-card internal"
            data-hub={hub.slug}
            href={joinSegments(base, hub.slug)}
            data-slug={hub.slug}
            style={`--bar:${hub.color}`}
          >
            <span class="hub-num">{String(i + 1).padStart(2, "0")}</span>
            <span class="hub-ko">
              {hub.tag ? (
                <>
                  {hub.label} <span class="hub-tag">{hub.tag}</span>
                </>
              ) : (
                hub.label
              )}
            </span>
            <span class="hub-en">{hub.en}</span>
            <span class="hub-desc">{hub.desc}</span>
            <span class="hub-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </nav>
      <p class="home-foot">
        기록은 비공개 위키에서 <code>visibility/public</code> 게이트를 통과한 노트만 단방향으로
        발행됩니다. 좌측 탐색기와 검색으로 전체 노트를 둘러볼 수 있어요.
      </p>
      {/* 기존 홈에서 본문(article) 뒤에 있던 구분선(renderPage 의 <hr/>)을 재현한다.
          이 컴포넌트는 page-footer 영역에 렌더되므로, 본문 뒤의 stray <hr/> 는
          custom.scss 에서 홈(index)에 한해 숨기고 여기서 같은 위치(푸터 안내문 아래)에 둔다. */}
      <hr />
    </>
  )
}

export default (() => HubGrid) satisfies QuartzComponentConstructor
