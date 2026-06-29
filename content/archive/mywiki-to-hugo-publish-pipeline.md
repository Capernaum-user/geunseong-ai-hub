---
title: MyWiki에서 Hugo 블로그로 발행하는 파이프라인
category: references
tags:
  - 지식관리
  - Obsidian
  - Hugo
  - visibility/internal
  - type/archive
created: 2026-06-28
updated: 2026-06-28
draft: true
summary: "[보관됨/비발행] 레거시 Hugo 발행 파이프라인 문서. 현행 Quartz 파이프라인([[mywiki-to-quartz-pipeline]])으로 대체되었다. 발행 게이트를 통과하지 않도록 visibility/internal + draft:true 로 둔다."
---

# MyWiki에서 Hugo 블로그로 발행하는 파이프라인

> [!warning] 보관됨 (비발행)
> 이 문서는 레거시 **Hugo** 발행 파이프라인을 설명한다. 현재 사이트는 Quartz로 발행하므로, 현행 구조는 [[mywiki-to-quartz-pipeline|MyWiki(Obsidian)에서 Quartz로 발행하는 파이프라인]]을 참고한다. 이 노트는 `visibility/internal` + `draft: true`로 두어 사이트에 발행되지 않는다.

근성쌤 지식블로그는 **위키가 원천(DB), Hugo가 발행물(렌더러)** 이라는 두 스택 분리 위에서 동작한다. 둘 사이의 "DB 연결"은 SQL 같은 런타임 연결이 아니라 **빌드타임 콘텐츠 동기화**다.

## 흐름

1. **수집(ingest)** — 거친 노트를 `_raw/`에 떨구고 `wiki-ingest`가 distill해 카테고리 페이지로 승격한다. 모든 페이지는 `title/category/tags/created/updated` 프론트매터와 `[[wikilinks]]`를 가진다.
2. **발행 게이트** — `tags`에 `visibility/public`이 있는 페이지만 블로그로 나간다. `visibility/internal`·`visibility/pii`·무표식은 위키에만 남는다. `pii`는 어떤 경우에도 발행하지 않는다.
3. **매핑** — `wiki-publish` 스킬이 위키 프론트매터를 Hugo 프론트매터로 변환한다: `created→date`, 도메인 태그(데이터분석/AI교육/자동화/지식관리/블록코딩/프로젝트/생성형AI)→`categories`, 나머지 태그→`tags`(시스템 태그 제거), 본문의 `[[wikilink]]`는 사이트 내부 링크 또는 평문으로 치환.
4. **단방향 복사** — `content/english/blog/<slug>.md`로 복사한다. 사이트→위키 역기록은 금지(원본 보존).
5. **빌드·배포** — `pnpm build`로 정적 산출물을 만들고 Vercel/GitHub Pages로 배포한다.

## 원칙

- **단일 진실원**: 지식은 위키에만 쌓고, 노출만 `visibility` 태그로 통제한다.
- **추적**: 발행 원장(`.publish-manifest.json`)이 source→slug와 staleness를 기록해, 공개가 해제되면 사이트에서도 자동 언퍼블리시한다.
- **안정성 우선**: 무거운 모션·외부위젯을 피하고 정적 산출물의 성능·안정성을 유지한다.

위 흐름은 Hugo 시절 기록이다. 현행 Quartz 파이프라인은 매핑 단계를 단순화하고 `[[위키링크]]`·백링크·그래프를 그대로 살린다 — [[mywiki-to-quartz-pipeline]] 참고.
