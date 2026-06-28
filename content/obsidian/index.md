---
title: Obsidian × 생성형 AI
category: obsidian
tags:
  - Obsidian
  - 생성형AI
  - 지식관리
  - visibility/public
  - type/index
created: 2026-06-28
updated: 2026-06-28
draft: false
summary: "Obsidian을 생성형 AI의 지식베이스이자 작업대로 쓰는 방법을 모은 허브. Vault 구조, AI 플러그인 스택, 위키→Quartz 단방향 발행 파이프라인을 다룬다."
---

# Obsidian × 생성형 AI

> 마크다운 금고 하나를 **AI의 장기기억**이자 **공개 지식허브**로 동시에 쓰는 방법.

Obsidian Vault는 사람만 보는 노트 앱이 아니다. 잘 설계하면 생성형 AI가 읽고·쓰고·연결하는 **단일 진실원(DB)** 이 되고, 그중 공개해도 되는 노트만 정적 사이트로 흘려보내는 **발행 원천**이 된다. 이 허브는 그 두 역할을 어떻게 한 금고에서 굴리는지 정리한다.

## 이 허브의 노트

- [[obsidian/obsidian-vault|Obsidian Vault (볼트 루트)]] — 모든 AI의 장기기억이 되는 정규 문서 저장소. 고정 폴더 레이아웃, RAG 시맨틱 인덱스, Drive 미러 구조.
- [[obsidian/ai-plugins|Obsidian + 생성형 AI 플러그인 스택]] — Copilot · Templater · Smart Connections · Local REST API · Excalidraw와 이를 엮은 자동화 패턴.
- [[obsidian/mywiki-to-quartz-pipeline|MyWiki→Quartz 발행 파이프라인]] — `visibility/public` 태그가 붙은 노트만 단방향으로 사이트에 내보내는 빌드타임 동기화. `[[위키링크]]`·그래프 자동.

## 큰 그림

1. **쌓는다** — 거친 노트를 Vault에 떨구고, 플러그인과 AI로 distill해 허브 아래 노트로 승격한다.
2. **연결한다** — `[[위키링크]]`와 Smart Connections로 노트를 엮으면, 그래프가 곧 탐색 인터페이스가 된다.
3. **발행한다** — `visibility/public` 게이트를 통과한 노트만 `npx quartz build`로 정적 사이트가 된다. 사이트→위키 역기록은 없다.

## 원칙

- **단일 진실원** — 지식은 Vault에만 쌓고, 노출은 태그로만 통제한다.
- **변환 최소화** — Quartz는 Obsidian 호환이라, 위키 마크다운을 거의 그대로 발행한다.
- **보안 우선** — API키·토큰·PII는 노트에 넣지 않고, 발행 게이트 이전에 차단한다.

## 이웃 허브

- [[local-llm/index|로컬 LLM]] — 임베딩·추론을 로컬에서 돌려 데이터 유출면을 줄인다.
- [[agents/index|AI 에이전트]] — Vault를 읽고 쓰는 외부 에이전트 설계.
