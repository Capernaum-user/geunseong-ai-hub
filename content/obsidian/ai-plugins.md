---
title: Obsidian + 생성형 AI 플러그인 스택
category: obsidian
tags:
  - Obsidian
  - 생성형AI
  - 플러그인
  - 자동화
  - visibility/public
  - type/reference
created: 2026-06-28
updated: 2026-06-28
draft: false
summary: "Obsidian을 생성형 AI 작업대로 바꾸는 핵심 플러그인 5종(Copilot, Templater, Smart Connections, Local REST API, Excalidraw)과 이를 엮은 자동화 활용을 정리한다."
---

# Obsidian + 생성형 AI 플러그인 스택

Obsidian은 그 자체로는 마크다운 에디터지만, 플러그인 몇 개를 얹으면 **AI가 읽고 쓰고 연결하는 지식 작업대**가 된다. 여기서는 [[obsidian/obsidian-vault|Vault]]를 생성형 AI와 함께 쓸 때 실제로 쓰는 5종을 역할별로 정리한다.

## 핵심 5종

### 1. Copilot — 금고 안의 챗 인터페이스
Vault 안에서 바로 LLM과 대화하고, 선택한 노트나 폴더를 컨텍스트로 넣어 질문한다. 긴 노트 요약, 초안 작성, Vault 전체를 대상으로 한 QA(채팅 위에서의 RAG)에 쓴다. 대화 로그는 `copilot` 폴더에 남는다.

### 2. Templater — 노트 생성 자동화
노트 생성 시 프론트매터(`created/updated/tags`)와 본문 골격을 자동으로 채운다. "AI 발행 노트 템플릿"을 만들어 두면 `visibility/public`, `draft: false` 같은 [[obsidian/mywiki-to-quartz-pipeline|발행 게이트]] 필드를 빠뜨리지 않게 강제할 수 있다. AI가 만든 노트의 형식 일관성을 보장하는 1차 방어선.

### 3. Smart Connections — 의미 기반 연결 추천
노트를 로컬에서 임베딩해, 지금 보는 노트와 의미가 가까운 다른 노트를 추천한다. `[[위키링크]]`를 손으로 다 걸지 않아도 관련 노트가 떠오르므로, 흩어진 노트를 허브로 묶는 distill 작업이 빨라진다. 그래프가 풍부해질수록 발행 사이트의 탐색성도 좋아진다.

### 4. Local REST API (& MCP Server) — 외부 AI 에이전트의 입구
Vault를 HTTP/MCP로 노출해, Claude·Codex 같은 **외부 에이전트가 노트를 직접 읽고 쓰게** 한다. 표시명은 `Local REST API & MCP Server`, 로컬 포트(예: secure `27124` / insecure `27123`)로 동작한다. 에이전트 기반 자동화의 핵심 연결고리.

> [!warning] 보안
> 이 플러그인의 API key는 Vault 제어 권한을 통째로 준다. **key·토큰을 노트에 적지 말 것.** 환경변수(`OBSIDIAN_LOCAL_REST_API_KEY`)로 주입하고, 노출이 의심되면 즉시 rotate한다. PII·시크릿은 발행 게이트 이전에 차단한다.

### 5. Excalidraw — 다이어그램과 시각 요약
손그림·구조도·1장짜리 시각 요약을 Vault 안에서 그린다. AI가 만든 개념을 도식으로 정리하거나, 발행 노트에 첨부할 다이어그램을 만들 때 쓴다. `.excalidraw.md`로 저장돼 마크다운·그래프와 같은 금고 안에서 관리된다.

## 엮어 쓰는 자동화 패턴

- **생성 표준화** — Templater 템플릿으로 새 노트의 프론트매터·발행 필드를 자동 주입 → AI가 형식 실수 없이 노트를 찍어낸다.
- **연결 distill** — Smart Connections가 관련 노트를 추천 → 허브로 묶고 `[[위키링크]]`를 정리 → Quartz 그래프가 자동으로 풍부해진다.
- **에이전트 집필** — 외부 에이전트가 Local REST API/MCP로 Vault에 접속 → Copilot은 Vault 내부 대화, 외부 에이전트는 멀티스텝 편집을 담당하는 이중 채널.
- **시각 자산** — Excalidraw로 개념도 작성 → 발행 노트에 임베드.

## 원칙

- **로컬 우선** — 임베딩·RAG는 가능한 한 로컬에서 처리해 데이터 유출면을 줄인다. (참고: [[local-llm/index|로컬 LLM]])
- **시크릿 분리** — API key/토큰/세션 파일은 백업·발행 대상에서 제외한다.
- **단방향 발행** — 플러그인으로 만든 노트도 [[obsidian/mywiki-to-quartz-pipeline|발행 파이프라인]]의 `visibility/public` 게이트를 통과해야만 사이트로 나간다.

## Related

- [[obsidian/obsidian-vault|Obsidian Vault]]
- [[obsidian/mywiki-to-quartz-pipeline|MyWiki→Quartz 발행 파이프라인]]
