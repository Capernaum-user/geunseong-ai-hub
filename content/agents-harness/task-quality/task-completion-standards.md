---
title: "작업 완료 표준"
category: harness
tags:
  - 하네스
  - ai-governance
  - 완료기준
  - visibility/public
  - type/reference
  - has-diagram
created: 2026-06-26
updated: 2026-06-28
draft: false
summary: "'완료'의 통합 정의 — 작업유형별 체크리스트(문서/코드/리서치/자동화), 4단계 자가검토, 코드 리뷰 심각도 등급, 완료 보고 형식."
---

# 작업 완료 표준

병합된 "완료"의 정의로, 완료를 보고하기 전 반드시 통과해야 한다. 이 단일 문서는 2026-05-30에 세 개의 이전 파일(`completion-acceptance-criteria` + `task-review-checklist` + `quality-control-protocol`)을 통합한 것이며, [[change-history-ratchet|통합 래칫]]의 한 사례다. 두 전신 원본은 이력을 위해 보존된다.

## 쉽게 말하면

> **한마디로:** "완료했습니다"라고 말하려면 무엇을 충족해야 하는지를 못박은 **단일 정의**입니다(원래 세 문서를 하나로 합친 것).

작업 유형별 체크리스트를 통과하고, 보고 전 **4단계 자가검토**를 거친 뒤에야 완료입니다.

```mermaid
flowchart LR
    T[작업] --> C[유형별 체크리스트<br/>문서·코드·리서치·자동화]
    C --> S[4단계 자가검토]
    S --> R[완료 보고]
```

## 보편 완료 기준

요청 항목 전부 처리; 미처리 항목은 이유와 함께 나열; 에러 기록; 의미 있는 작업은 AI의 작업일지에 기록.

## 신규 볼트 문서 체크리스트

- **파일명** — `descriptive-title.md`, 소문자 kebab-case, 특수문자/한글 없음; 제목 3~8 단어; `type`은 허용 목록(readme/plan/spec/log/research/troubleshoot/meeting/summary/index/archive)에서.
- **프론트매터** — `created_at`, `updated_at`(YYYY-MM-DD), `project`, `type`, `tool`(claude/gemini/chatgpt/codex/manual), `status`(draft/active/done/archived), `source_path`, `related`(정당할 때만).
- **위치/내용** — 올바른 폴더, 키/토큰/PII 없음, 정당할 때만 링크, 사람이 읽는 텍스트는 한국어 기본, 일반 마크다운 ≤12,000자/20 KB(25,000/40 KB에서 분할), 100행 초과 표 → CSV/JSONL/SQLite. [[file-operations-rules]] 참고.

## 코드 체크리스트

실행 가능한 완전한 코드(`...` 생략 금지), 타입 힌트(Python), 예외 처리, 요청 범위만. 보안: SQL 인젝션 없음, 경로 탐색 없음, 하드코딩 시크릿 없음(환경변수 사용), 과잉 권한 없음. 품질: 단일 책임, 의존성+버전, `.env`/`*.key`용 `.gitignore`, 파일 ≤600줄/40 KB(800/60 KB에서 모듈 분할 검토, 1,000/80 KB에서 분할 계획 필수). 편집 시: 기존 동작 보존, 변경 범위/이유 설명, 인터페이스 변경 표시.

## 리서치 & 자동화

리서치: 중복 검색 제거, 출처 인용, 불확실성 "확인 필요" 표시, TL;DR 먼저, 관련 볼트 문서에 링크, Mark9 기밀 점검. 자동화: 실행 환경 명시, 예외 처리, 로그로 관찰 가능, 파괴적 작업은 dry-run/확인, 예약 작업은 실패 경보, 환경변수 설정.

## 4단계 자가검토 (보고 전)

1. 요청 대비 출력 비교(요청한 것 다 했나? 군더더기 추가는 없나?)
2. 해당 체크리스트 통과(실패는 보고에 기록)
3. 보안 스캔(키/토큰/PII 없음, 외부 업로드 없음)
4. 파일 검증(파일이 실제 존재하고 기대 내용을 담았는가)

## 코드 리뷰 심각도

| 등급 | 의미 | 조치 |
|---|---|---|
| CRITICAL | 보안 구멍, 데이터 손실 가능 | 즉시 수정 + 사용자 경보 |
| HIGH | 기능 오류, 실행 불가 | 반드시 수정 |
| MEDIUM | 성능/유지보수성 | 권고 |
| LOW | 스타일/관례 | 선택 |

## 완료 보고 형식

처리 항목 / 미처리(이유 포함) / 에러 & 주의 / 검증 결과 / 참조한 볼트 문서.

## 출처

내부 하네스 규칙 문서(`00_Harness/task-completion-standards.md`, 2026-05-30 병합 및 전신 `completion-acceptance-criteria.md`, `task-review-checklist.md`)를 큐레이션해 정리했다.
