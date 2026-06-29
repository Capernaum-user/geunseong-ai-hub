// ─────────────────────────────────────────────────────────────────────────
// 카테고리(허브) 단일 데이터 소스 (Single Source of Truth)
//
// 데이터는 hubs.json에서 관리한다. 이 파일은 타입(HubEntry)만 정의하고
// JSON을 import 하여 HUBS로 노출한다. (플러그인이 TS 파싱 없이 JSON만
// 안전하게 편집할 수 있도록 데이터를 코드에서 분리.)
//
// 이 배열 하나가 홈(content/index.md) 아래 허브 카드 그리드(HubGrid)와
// 상단 내비게이션(Nav)을 동시에 구동한다.
//
// 새 카테고리 추가:
//   1) hubs.json 배열에 한 항목 추가  ({ slug, label, nav, en, desc, color })
//   2) content/<slug>/index.md 폴더/노트 추가
//   → 홈 카드 + 상단 네비가 함께 갱신된다.
// ─────────────────────────────────────────────────────────────────────────

import hubsData from "./hubs.json"

export type HubEntry = {
  /** URL slug + content 폴더명 (예: "agents" → /agents, content/agents) */
  slug: string
  /** 홈 카드 한글 제목 (hub-ko) */
  label: string
  /** 상단 네비 라벨 (홈 카드보다 짧은 표기) */
  nav: string
  /** 영문 라벨 (hub-en) */
  en: string
  /** 한 줄 설명 (hub-desc) */
  desc: string
  /** 좌측 컬러 bar 색 (hex). 인라인 CSS 변수 --bar 로 주입된다. */
  color: string
  /** 선택: 카드 제목 옆 배지 (예: "비주력") */
  tag?: string
}

export const HUBS: HubEntry[] = hubsData as HubEntry[]
