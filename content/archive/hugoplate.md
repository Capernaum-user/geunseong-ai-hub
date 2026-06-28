---
title: Hugoplate
draft: true
category: entities
tags:
  - hugoplate
  - hugo
  - tailwind
  - theme
summary: >-
  zeon-studio가 제작한 Hugo 테마 스타터. Tailwind CSS 내장, 다크모드·검색·i18n 기본 제공. MIT 라이선스.
sources:
  - _sources/hugosetting.md
created: "2026-06-24"
updated: "2026-06-24"
tier: supporting
base_confidence: 0.57
lifecycle: draft
lifecycle_changed: "2026-06-24"
provenance:
  extracted: 0.85
  inferred: 0.15
  ambiguous: 0.00
---

# Hugoplate

zeon-studio가 제작·관리하는 Hugo 테마 스타터. GitHub: https://github.com/zeon-studio/hugoplate  
MIT 라이선스로 상업 프로젝트에도 사용 가능하다.

## 내장 기능

- **Tailwind CSS** — 유틸리티 우선 스타일링. `tailwind.config.js`에서 브랜드 색만 최소 변경한다.
- **다크모드 토글** — `params.toml`에서 활성화.
- **i18n (다국어)** — `content/english/` 기본 구조; 언어 추가 시 `languages.toml` + `content/<lang>/` 추가.
- **내장 검색** — Fuse.js 계열, 추가 인프라 불필요.
- **반응형** — 모바일 레이아웃 기본 제공.

## 기본 제공 섹션 (마케팅·블로그 지향)

hugoplate 기본은 마케팅 랜딩 + 블로그 구조다. `/docs`(기술문서 사이드바)와 `/portfolio`(카드 그리드)는 기본 내장이 아니므로 `layouts/`에 커스텀 레이아웃을 추가해야 한다.^[inferred]

## 설치

```bash
git clone https://github.com/zeon-studio/hugoplate.git my-site
cd my-site
npm install
```

테마/도구 버전은 클론 시점 최신을 따른다.

## 커스터마이징 범위

| 영역 | 방법 |
|---|---|
| 브랜드 색 | `params.toml` + `tailwind.config.js` 최소 변경 |
| 메뉴 | `config/_default/menus.en.toml` 교체 |
| 홈 섹션 | `content/english/_index.md` 프론트매터 데이터 블록 수정 |
| 추가 레이아웃 | `layouts/` 하위에 partial/template 추가 |

## Related

- [[hugo]]
- [[hugo-site-setup]]
- [[hugo-site-ia]]
