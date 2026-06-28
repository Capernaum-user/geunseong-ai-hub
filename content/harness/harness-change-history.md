---
title: "하네스 변경 이력"
category: harness
tags:
  - 하네스
  - ai-governance
  - 변경이력
  - visibility/public
  - type/reference
created: 2026-06-26
updated: 2026-06-28
draft: false
summary: "하네스 규칙 자체의 추가 전용(append-only) 변경 이력 — v1 생성, 표준화, 파일명 규칙 정정, 17→14 통합, Drive Viewer 정책, AI 컨텍스트 크기 정책."
---

# 하네스 변경 이력

하네스 규칙 자체의 변경을 추가 전용으로 남기는 기록이다(작업 업무는 작업일지에 따로 남긴다). 그 배경 원칙이 [[change-history-ratchet|변경 이력 래칫]]이다.

## 타임라인

- **2026-05-29 v1 생성** (Claude) — Claude/Gemini/Codex가 하나의 볼트 표준을 공유하도록 15개 운영 규칙 문서 작성.
- **2026-05-29 표준화** (Codex) — 인덱스 + 변경로그 추가, 15개 문서에 YAML 프론트매터 + 표준 태그, 내부 링크, Drive `obsidian_remote_sync`/`99_archive` 정책, 파일명 정리. 백업 완료.
- **2026-05-30 형식/동기화/RAG 정렬** (Codex) — 로컬 + Drive에 걸쳐 17개 표준 파일명 통일, 17개 문서에 프론트매터/태그/위키링크 추가, 마크다운 파일명 규칙을 `descriptive-title.md`로 수정, 작업로그 과노출과 미러 중복을 줄이도록 RAG 랭킹 조정. 로컬 17 + Drive 17, 누락 필드 0 검증.
- **2026-05-30 무날짜 파일명 규칙** (Codex) — 파일명에 날짜/프로젝트/타입 및 `__`가 없음을 확인, 로컬·Drive의 날짜 접두 이름 정리, 전역 설정 문서와 RAG 아카이브 규칙 정정. 날짜 접두 파일 0 검증.
- **2026-05-30 v1.1 재구조화** (Claude) — **통합 단계:** `completion-acceptance-criteria` + `task-review-checklist` + `quality-control-protocol` → [[task-completion-standards|task-completion-standards]] 병합(3→1), `agent-memory-rules` + `agent-handoff-protocol` → [[session-continuity-protocol|session-continuity-protocol]] 병합(2→1). 파일 작업 문서의 깨진 YAML, 프롬프트 표준의 중복 섹션 3, 여러 문서의 MDTS 잔재도 정리. 결과: 17 → 14개 파일.
- **2026-06-05 Drive Viewer 정책** (Codex) — 독립 HTML/PPT/Slides/PDF는 `AI_Workspace_Viewer`로, 프로젝트 귀속 원본은 제자리에 둔다.
- **2026-06-05 Excalidraw_MD 정책** — 독립 `.excalidraw.md`용 `Excalidraw_MD` 뷰어 폴더 추가.
- **2026-06-05 AI 컨텍스트 크기 정책** (Codex) — 마크다운·작업일지·코드에 글자수/KB/줄 예산 도입(see [[file-operations-rules]]). 기존 초과 파일은 레거시 부채로 분류해 보존.

## 변경 기록 원칙

규칙의 의미가 바뀌면 날짜/작성자/범위/이유를 기록한다. 오타는 작업일지에만 남겨도 된다. 보안·동기화·파일명·프론트매터·역할 분리 변경은 **반드시** 여기 기록한다.

## 출처

내부 하네스 규칙 문서(`00_Harness/harness-change-history.md`, 2026-06-05 갱신)를 큐레이션해 정리했다.
