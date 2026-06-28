---
title: "하네스 엔지니어링 개요"
category: harness
tags:
  - 하네스
  - ai-governance
  - LLM통제
  - visibility/public
  - type/reference
created: 2026-06-26
updated: 2026-06-28
draft: false
summary: "하네스 엔지니어링 v1 거버넌스 시스템의 개요 노트 — Claude·Gemini·Codex가 Obsidian 볼트를 일관되게 운영하도록 만든 공유 규칙집."
---

# 하네스 엔지니어링 개요

**하네스 엔지니어링 v1**(`00_Harness/`)은 하나의 거버넌스 시스템이다. 모든 AI 에이전트 — [[ai-agent-roles|Claude, Gemini, Codex]] — 가 [[obsidian-vault|Obsidian 볼트]]를 일관되게 운영하기 위해 참조하는 19개 마크다운 규칙 문서 묶음이다. 사용자(권태향)의 작업 공간에서 멀티 에이전트 협업을 위한 "운영체제" 역할을 한다.

## 핵심 아이디어

- 하네스는 무관한 파일들의 폴더가 아니라 하나의 일관된 시스템이다. 문서들은 엄격한 우선순위 사슬을 이루고 서로를 활발히 교차 참조한다.
- 새 세션은 고정된 진입 순서를 따른다: [[ai-master-constitution|헌법]] → [[mark9|미션/맥락]] → [[task-execution-protocol|작업 실행]] → [[task-completion-standards|완료 표준]] → [[harness-change-history|변경 이력]].
- 시스템은 15개 문서로 시작해(2026-05-29) 17개로 늘었다가, 의도적으로 14개 활성 규칙 파일 + 인덱스/변경로그로 통합되었다 — [[change-history-ratchet|변경 이력 래칫]]이 모든 구조 변경을 추적한다.
- 원본 인덱스는 두 문서를 중복 의심으로 표시한다: `session-continuity-protocol.md`(메모리 + 핸드오프 중첩)와 `task-completion-standards.md`(수용 기준 중첩). 이들은 병합된 후속 문서다.

## 우선순위 사슬 (더 엄격한 것이 이김)

1. 사용자 직접 지시 (현재 세션)
2. [[ai-master-constitution|AI 마스터 헌법]] (보안·무결성)
3. 하네스 파일 (`00_Harness/`)
4. 공유 AI 설정 허브
5. AI별 전역 설정 (예: `CLAUDE.md`)
6. 프로젝트 로컬 설정
7. 기존 볼트 문서 관례

규칙이 충돌하면 **더 엄격한** 규칙을 적용한다. 편의가 더 엄격한 규칙을 덮어쓰는 일은 없다.

## 문서 지도

| 영역 | 페이지 |
|---|---|
| 최상위 원칙 | [[ai-master-constitution]] |
| 의사결정 & 에스컬레이션 | [[agent-decision-rules]] · [[agent-decision-escalation]] |
| 역할 | [[ai-agent-roles]] |
| 작업 실행 | [[task-execution-protocol]] |
| 완료 / 품질 | [[task-completion-standards]] · [[quality-control-protocol]] |
| 세션 연속성 | [[session-continuity-protocol]] · [[session-continuity-handoff]] |
| 파일 작업 | [[file-operations-rules]] |
| 보안 | [[agent-security-policy]] |
| 실패 복구 | [[failure-recovery-protocol]] · [[failure-recovery-grading]] |
| 프롬프트 표준 | [[agent-prompt-standards]] |
| 변경 이력 | [[harness-change-history]] · [[change-history-ratchet]] |
| 워크플로우 흐름도 | [[agent-workflow-diagram]] |

## 미션 맥락

핵심 미션은 세 AI가 하나의 일관된 표준 아래 협업하게 하고, 볼트를 정본 문서 저장소로 두는 것이다. 조직적 맥락은 스타트업 [[mark9|Mark9]](Rust 우선 개발 정책)다. 과거 의료 프로젝트(MDTS)는 명시적으로 종료·후순위화되었다.

## 열린 질문

- 인덱스는 19개 파일을 나열하지만 2026-05-30 v1.1 통합은 "14개 활성 파일"이라고 보고한다 — 그 차이는 인덱스 + 변경로그 + 이력을 위해 보존된 중복 의심 원본이다.

## 출처

내부 하네스 규칙 문서(`00_Harness/harness-engineering-index.md`, `ai-master-constitution.md`, `project-mission-context.md`)를 큐레이션해 정리했다.
