---
title: Hugo 사이트 설정 및 제작 스킬
draft: true
category: skills
tags:
  - hugo
  - static-site
  - hugoplate
  - tailwind
summary: >-
  AI 에이전트가 Hugo + hugoplate 기반 블로그/포트폴리오/기술문서 사이트를 제작할 때 따르는 고정 명세. 스택·구조 기준값과 7단계 워크플로우를 정의한다.
sources:
  - _sources/hugosetting.md
created: "2026-06-24"
updated: "2026-06-24"
tier: core
base_confidence: 0.57
lifecycle: draft
lifecycle_changed: "2026-06-24"
provenance:
  extracted: 0.90
  inferred: 0.10
  ambiguous: 0.00
---

# Hugo 사이트 설정 및 제작 스킬

"블로그 만들어줘", "포트폴리오 사이트", "정적 사이트", "hugoplate" 등의 요청이 오면 이 스킬을 적용한다. 사용자가 Hugo를 명시하지 않아도 정적 사이트 맥락이면 동일하게 적용한다.

## 고정 스택

| 항목 | 값 |
|---|---|
| 생성기 | Hugo (extended 버전) |
| 테마 | `zeon-studio/hugoplate` |
| 스타일 | Tailwind CSS (테마 내장) |
| 호스팅 | Vercel / Cloudflare Pages / Netlify / GitHub Pages (택1) |
| 폼 | Google Forms 또는 Formspree |
| 검색 | hugoplate 내장 (Fuse.js 계열) |
| 댓글 (선택) | Giscus (GitHub Discussions) |

스택과 구조는 고정값 유지 — 콘텐츠만 요청마다 변경한다.

## 설정 파일 핵심 항목

**`config/_default/hugo.toml`**
```toml
baseURL = "https://example.com/"
title = "<사이트 제목>"
```

**`config/_default/params.toml`**
- 로고, 파비콘, og-image
- 다크모드 토글, 검색 on
- 소셜 링크, navigation_button ("문의하기" / "프로젝트 의뢰"로 교체)

**`config/_default/menus.en.toml`** — 7개 메뉴: 홈, 소개, 포트폴리오, 강좌, 기술문서, 블로그, 문의  
주의: 원본 `Class/Databank/후원하기` 메뉴를 강좌/기술문서/문의로 반드시 치환한다.

## 콘텐츠 타입별 프론트매터

**블로그** (`content/english/blog/<slug>.md`):
```yaml
title: ""
date: 2026-01-01
image: "/images/blog/..."
categories: [""]
tags: [""]
draft: false
```

**포트폴리오** (`content/english/portfolio/<slug>.md`):
```yaml
title: ""
date: 2026-01-01
image: "/images/portfolio/..."
summary: "한 줄 요약"
tech: ["", ""]
link: ""
weight: 1
```

**기술문서** (`content/english/docs/<category>/<slug>.md`):
```yaml
title: ""
weight: 1
draft: false
```

## 제작 워크플로우 (7단계)

1. **요구 확인** — 목적·브랜드명·도메인·필요 섹션 (이미 주어졌으면 생략)
2. **베이스 준비** — `zeon-studio/hugoplate` 클론 → `npm install`
3. **설정 교체** — title, baseURL, params(로고·색·소셜·검색), 메뉴 7개
4. **콘텐츠 교체** — 홈 `_index.md` 섹션 7개, 소개/문의, 블로그 샘플
5. **섹션 추가** — `/docs`(사이드바) + `/portfolio`(그리드) 레이아웃·콘텐츠 추가
6. **로컬 검증** — `npm run dev` → `hugo --gc --minify` (에러 0 확인)
7. **배포 안내** — 정적 호스팅 연결 + 도메인 절차 안내 (자격증명은 사용자가 직접 입력)

## 납품 전 체크리스트

- [ ] 메뉴 7개, Class/Databank/후원 흔적 없음
- [ ] 홈 섹션 7개 구성, 인용문/종교 표현 없음
- [ ] 포트폴리오 그리드·상세, 기술문서 사이드바·검색 동작
- [ ] `hugo --gc --minify` 빌드 에러 0
- [ ] 이미지 webp 최적화, 폼 연동 확인
- [ ] baseURL·도메인·소셜 링크 실제 값으로 채움

## 콘텐츠 규칙

- 기본 언어 한국어, 코드/설정은 영어 그대로
- 참조 원본(`jesusiswith.us`)의 종교·단체 표현은 절대 포함하지 않는다 (구조 참고 전용)
- 카피는 간결·직접

## 디자인 규칙

- 다크모드 토글·반응형 필수 (hugoplate 기본 유지)
- 브랜드 색만 params/Tailwind에서 최소 변경; 그라데이션 남발·무거운 애니메이션 지양
- 이미지는 Hugo 파이프라인으로 webp 변환·리사이즈

## 요청 프롬프트 템플릿

```
hugosetting.md 규칙대로 사이트를 만들어줘.
- 목적: [포트폴리오/기술문서/소개/블로그 중 사용할 것]
- 브랜드명: [ ]   도메인: [ ]
- 핵심 활동 3축: [ ] / [ ] / [ ]
- 제공 서비스(최대 6): [ ]
- 채널 링크: [ ]   소셜: [ ]
스택·구조는 hugosetting.md 고정값을 따르고, 빌드 에러 0으로 완성해줘.
```

## Related

- [[hugo]]
- [[hugoplate]]
- [[hugo-site-ia]]
