---
title: Hugo
draft: true
category: entities
tags:
  - hugo
  - static-site
  - go
summary: >-
  Go 기반 오픈소스 정적 사이트 생성기. 빠른 빌드 속도와 확장 버전(Sass/WebP 지원)이 특징이며, hugoplate 등 다양한 테마 생태계를 보유한다.
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

# Hugo

Go 언어로 작성된 오픈소스 정적 사이트 생성기(static site generator). 공식 사이트: https://gohugo.io/

## 특징

- **빠른 빌드** — Go 컴파일러 기반으로 수천 페이지를 초 단위에 빌드한다 ^[inferred]
- **Extended 버전** — Sass/SCSS 컴파일, WebP 이미지 변환 등 추가 파이프라인 기능 내장. MyWiki 연동 스택에서는 extended 버전을 기준으로 한다.
- **콘텐츠 타입** — `content/` 디렉토리 하위 폴더 구조가 URL 구조와 직접 매핑된다.
- **프론트매터** — YAML/TOML/JSON 중 택일. Hugoplate 기반 스택에서는 YAML을 사용한다.
- **이미지 파이프라인** — 빌드 시 WebP 변환·리사이즈를 처리하여 로딩 최적화.

## 설정 구조 (hugoplate 기준)

```
config/_default/
├── hugo.toml       # baseURL, title
├── params.toml     # 브랜드·기능 파라미터
├── menus.en.toml   # 내비게이션 메뉴
├── languages.toml  # 다국어 설정
└── markup.toml     # 마크다운 렌더러 설정
```

## 주요 빌드 명령

```bash
hugo server -D          # 개발 서버 (draft 포함)
npm run dev             # hugoplate 기반 프로젝트 개발 서버
hugo --gc --minify      # 프로덕션 빌드 (미니파이 + 캐시 정리)
```

## Related

- [[hugoplate]]
- [[hugo-site-setup]]
