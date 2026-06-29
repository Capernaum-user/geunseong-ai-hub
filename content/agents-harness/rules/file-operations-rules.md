---
title: "파일 작업 규칙"
category: harness
tags:
  - 하네스
  - ai-governance
  - 파일관리
  - visibility/public
  - type/reference
  - has-diagram
created: 2026-06-26
updated: 2026-06-28
draft: false
summary: "D:\\ 드라이브의 모든 파일 작업 표준 — 명명, 저장 레이아웃, 필수 프론트매터, AI 컨텍스트 크기 예산, 수정 규칙, Google Drive 동기화/백업 정책, Daily Note 생성."
---

# 파일 작업 규칙

[[obsidian-vault|볼트]]와 `D:\` 드라이브의 모든 파일 작업 표준이다. 하네스에서 가장 큰 문서이며, 시각 경고(호박색 제목) 문서다.

## 쉽게 말하면

> **한마디로:** 파일을 어떻게 **이름 짓고, 어디에 두고, 어떻게 고치고 지울지**를 정한 표준입니다. 이름은 소문자 kebab-case, 날짜·타입 같은 정보는 파일명이 아니라 프론트매터에 넣고, 삭제는 반드시 확인을 받습니다.

```mermaid
flowchart LR
    N[명명<br/>kebab-case] --> S[저장<br/>지정 폴더]
    S --> F[프론트매터<br/>필수 필드]
    F --> M[수정<br/>updated 갱신·삭제는 확인]
    M --> B[백업·Drive 미러]
```

## 명명

- 마크다운: `descriptive-title.md`; 다이어그램: `descriptive-title.excalidraw.md`. 소문자 kebab-case, 하이픈 구분자만(이중 언더스코어 `__` 금지).
- 날짜 / 프로젝트 / 타입 / 도구 / 상태는 파일명이 아니라 **프론트매터**에 둔다.
- **고정 이름 예외:** `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `RESUME.md`; 고정 경로가 필요한 플러그인/템플릿 파일; Daily Note `03_ai_notes/daily-views/YYYY-MM-DD.md`.
- **금지:** 날짜 접두 파일명, 프로젝트/타입 접두, `__`, 공백/한글/대문자/괄호/특수문자, 그리고 같은 문서의 단축본 + 표준본 중복 보관.

## 저장 레이아웃

`00_inbox`(미분류) · `00_Harness`(이 시스템) · `01_projects/<name>` · `02_documents` · `03_ai_notes/work-logs/{claude,gemini,codex}` · `04_attachments/<project>` · `90_references/<topic>` · `99_archive`. 코드/실험은 볼트 밖(`프로젝트 루트\`)에 두고, 최종 마크다운/PDF만 볼트에 둔다. 독립 HTML/PPT/Slides/PDF/`.excalidraw.md`는 Google Drive `AI_Workspace_Viewer`로 가며, 프로젝트 귀속 원본은 프로젝트 폴더를 벗어나지 않는다. 소유가 불명확하면 `[확인필요]` 태그를 단다.

## 필수 프론트매터

`created_at`, `updated_at`(YYYY-MM-DD), `project`, `type`, `tool`(claude/gemini/chatgpt/codex/manual), `status`(draft/active/done/archived), `source_path`, `related`.

## AI 컨텍스트 크기 예산

| 대상 | 목표 | 분할/조치 |
|---|---|---|
| 일반 마크다운 | 12,000자 / 20 KB | 25,000자 / 40 KB에서 인덱스 + 자식 노트로 분할 |
| 부트/설정/인덱스/핸드오프 문서 | 8,000자 / 15 KB | 핵심 규칙은 두고 상세는 별도 스펙/로그로 |
| 작업일지 항목 | 2,000자 | 별도 보고를 링크, 일지엔 요약만 |
| 활성 작업일지 | 60,000자 / 100 KB | 초과 전 롤오버 |
| 마크다운 표 | 100행 | CSV/JSONL/SQLite 사용 |
| 문서 내 코드 블록 | 120줄 | 외부 코드 파일로 이동, 경로+요약만 보관 |
| AI 작성/대량 편집 코드 | 600줄 / 40 KB | 800/60 KB에서 분할 검토, 1,000/80 KB에서 계획 필수 |

기존 큰 파일을 임의로 분할/이동/삭제하지 않는다 — 먼저 계획을 제안한다. 레거시 초과 파일은 부채로 보존한다. `.excalidraw.md`는 예외(그림 JSON)지만 중요한 것은 4,000자 이하 요약을 짝지어 둔다.

## 수정 규칙

편집 → `updated_at` 갱신; 개명 → 먼저 백업, 전/후 경로 보고, Obsidian 링크 점검; 이동 → 목적지 규칙 적합성 검증; 삭제 → 사용자 확인 필수 + 비가역성 고지; 대량(50개 이상) → 에스컬레이션; 크기 초과 → 예산을 먼저 적용.

## 내부 링크

참조 관계가 명확할 때만 링크한다(A가 B를 직접 참조). 같은 폴더, 비슷한 주제, 링크 수 부풀리기를 위해 링크하지 않는다. 형식은 `[[볼트-상대-경로/파일명]]`이며, 파일 존재를 검증한다.

## Google Drive 동기화 & 백업

로컬 `볼트 루트`가 정본이다. `obsidian_remote_sync`는 마크다운 미러일 뿐 작업 공간이 아니며, `AI_Workspace_Viewer`는 독립 산출물 뷰어 허브다. 승인 없이 업로드/삭제/이동/권한/공유링크를 변경하지 않는다(승인된 범위에서 새 뷰어 산출물 생성은 허용). 개명/대량 편집/동기화 전 백업은 `볼트 백업 폴더\<task>-YYYYMMDD-HHMMSS`로 간다. 충돌: 양쪽 보존, `_conflict_YYYYMMDD-HHMMSS` 접미, 사용자 확인. 자격증명 포함 파일(예: local-rest-api `data.json`)은 일반 백업/동기화에서 제외한다.

## D:\ 가져오기 & Daily Note

가져오기: `00_imported_from_d/` 아래로 구조를 유지하며 복사(이동 아님). Daily Note: 파일을 생성한 날에는 `_template-daily.md`로 `03_ai_notes/daily-views/YYYY-MM-DD.md`가 없으면 생성한다. 이것은 Dataview 컨테이너이므로 파일 목록을 손으로 편집하지 않는다.

## 출처

내부 하네스 규칙 문서(`00_Harness/file-operations-rules.md`, 2026-06-05 갱신)를 큐레이션해 정리했다.
