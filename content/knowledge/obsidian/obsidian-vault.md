---
title: "Obsidian 볼트 (볼트 루트)"
category: obsidian
tags:
  - Obsidian
  - 지식관리
  - 하네스
  - visibility/public
  - type/entity
  - has-diagram
created: 2026-06-26
updated: 2026-06-28
draft: false
summary: "볼트 루트에 있는 정본 문서 저장소 — 모든 AI의 장기 기억. 고정된 루트 폴더 레이아웃, RAG 시맨틱 인덱스, Google Drive 마크다운 미러를 갖춘다."
---

# Obsidian 볼트 (볼트 루트)

모든 하네스 에이전트의 정본 문서 저장소이자 **장기 기억**이다 — 세션을 넘어 영속하며, 어떤 작업이든 시작 전에 먼저 검색하는 곳이다.

## 쉽게 말하면

> **한마디로:** 볼트는 모든 AI가 쓰고 읽는 **정본 문서 창고이자 장기 기억**입니다. 어떤 작업이든 시작 전에 여기를 먼저 검색합니다.

정해진 폴더 구조 + 의미 검색(RAG) 인덱스 + Drive 미러로 운영됩니다.

```mermaid
flowchart LR
    A[에이전트<br/>Claude·Gemini·Codex] -->|쓰기·검색| V[볼트<br/>정본 장기기억]
    V --> R[RAG 시맨틱 인덱스]
    V -.->|미러| D[Google Drive]
```

## 고정 루트 레이아웃

`00_inbox` · `00_Harness`(규칙집) · `00_imported_from_d` · `01_projects/<name>` · `02_documents` · `03_ai_notes/work-logs/{claude,gemini,codex}` · `04_attachments/<project>` · `90_references/<topic>` · `99_archive`. 폴더 명명: 소문자/숫자/하이픈/언더스코어; 번호 접두 루트는 명명 예외다. 전체 규칙은 [[file-operations-rules]].

## 검색 우선순위 (장기 기억)

`01_projects` → `03_ai_notes` → `90_references` → `00_inbox`. 시작 전 항상 검색하고 관련 문서를 읽는다.

## RAG 시맨틱 인덱스

`볼트 루트\.rag\`에 시맨틱 인덱스가 있다: `python .rag/query.py "..."`로 질의(먼저 `similarity >= 0.5` 읽기); 볼트 파일 생성/수정/삭제 후 `python .rag/ingest.py`로 갱신([[task-execution-protocol]]에 따라 필수); 인덱스 지도는 `generate_index_map.py`.

## 정본 vs 미러

`볼트 루트`가 정본이다. Google Drive `obsidian_remote_sync`는 마크다운 미러이고, `AI_Workspace_Viewer`는 독립 산출물 뷰어 허브다. 백업은 `볼트 백업 폴더\`로 간다. 동기화/충돌 규칙은 [[file-operations-rules]].

## 시스템에서의 역할

볼트는 에이전트 아래에 깔린 영속 계층이다 — [[ai-agent-roles|Claude/Gemini/Codex]]가 최종 문서를 여기 쓰고, 작업일지를 여기 두며, [[session-continuity-protocol|세션 연속성]]에 사용한다. 하네스([[harness-engineering]]) 자체가 `00_Harness/`에 들어 있다.

## 출처

내부 하네스 규칙 문서(`00_Harness/file-operations-rules.md`, `agent-memory-rules.md`, `project-mission-context.md`)를 큐레이션해 정리했다.
