---
title: Hugo 사이트 정보구조 (IA) 패턴
draft: true
category: concepts
tags:
  - hugo
  - information-architecture
  - static-site
summary: >-
  hugoplate 기반 사이트의 표준 정보구조 패턴. 7개 글로벌 메뉴, 7개 홈 섹션, 6개 독립 페이지로 구성되며 포트폴리오·기술문서·블로그·소개를 단일 사이트에 통합한다.
sources:
  - _sources/hugosetting.md
created: "2026-06-24"
updated: "2026-06-24"
tier: supporting
base_confidence: 0.57
lifecycle: draft
lifecycle_changed: "2026-06-24"
provenance:
  extracted: 0.90
  inferred: 0.10
  ambiguous: 0.00
---

# Hugo 사이트 정보구조 (IA) 패턴

hugoplate 기반 사이트의 표준 IA 패턴. 포트폴리오·기술문서·단체/개인 소개·블로그 네 가지 용도를 단일 사이트에서 수행한다.

## 글로벌 메뉴 (7개)

`홈 · 소개 · 포트폴리오 · 강좌 · 기술문서 · 블로그 · 문의`

## 홈 (원페이지) 섹션 구성 (위→아래, 7개)

| 순서 | 섹션 | 내용 |
|---|---|---|
| 1 | Hero | 브랜드 슬로건 (인용문/종교 표현 금지) |
| 2 | 핵심 활동 3축 | 요청 도메인에 맞게 정의 (예: 교육/개발·기술/컨설팅) |
| 3 | 제공 서비스 6종 | 카드 그리드 |
| 4 | 채널·콘텐츠 | 유튜브/외부 채널 카드 |
| 5 | 소식지 신청 | 뉴스레터 (Google Forms 연동) |
| 6 | 소개 미리보기 | 대표/운영자 요약 → 소개 페이지 연결 |
| 7 | 문의 CTA | 문의 페이지/폼으로 연결 |

## 독립 페이지 (6개)

| 페이지 | URL 경로 | 설명 |
|---|---|---|
| 소개 | `/about` | 경력·전문 분야·자격 |
| 포트폴리오 | `/portfolio` | 프로젝트 카드 그리드 → 상세 페이지 |
| 강좌 | `/courses` | 커리큘럼·수강 신청 |
| 기술문서 | `/docs` | 카테고리별 문서 + 좌측 사이드바 + 검색 |
| 블로그 | `/blog` | 글 목록 → 상세 |
| 문의 | `/contact` | 문의 폼·연락처 |

## 구현 분류

- **hugoplate 기본 제공:** 소개, 블로그 섹션 (기본 템플릿 활용)
- **커스텀 레이아웃 추가 필요:** 포트폴리오(카드 그리드), 기술문서(사이드바+검색)

기술문서 `/docs`는 hugoplate가 마케팅 지향이므로 사이드바가 기본 내장이 아니다. 단일 사이트 일관성을 위해 `/docs` 전용 list/single 레이아웃을 `layouts/`에 추가하는 방식을 사용한다 — 별도 docs 테마로 분리하면 디자인·배포 이원화로 관리 부담이 커진다.^[inferred]

## Related

- [[hugo-site-setup]]
- [[hugoplate]]
