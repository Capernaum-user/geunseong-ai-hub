# 관리자 가이드 — 근성쌤 AI 지식허브 (Quartz MyWiki)

> 이 문서는 사이트 **운영자(나)** 를 위한 안내입니다.
> repo 루트에 있고 `content/` 밖이라 **공개 사이트에는 발행되지 않습니다.**

## 목차
1. [Quartz는 어떻게 동작하나 (정적 사이트 원리)](#1-quartz는-어떻게-동작하나-정적-사이트-원리)
2. [문서 편집 — Obsidian으로 쓰고 즉시 미리보기](#2-문서-편집--obsidian으로-쓰고-즉시-미리보기)
3. [카테고리(허브) 관리 — 추가 / 이름·순서 변경 / 삭제](#3-카테고리허브-관리--추가--이름순서-변경--삭제)
4. [일반 노트 추가 & 비공개 처리](#4-일반-노트-추가--비공개-처리)
5. [배포 — 공개 사이트에 반영](#5-배포--공개-사이트에-반영)
6. [내 메인 볼트(MyWiki)에서 골라 발행하기](#6-내-메인-볼트mywiki에서-골라-발행하기)
7. [자주 겪는 문제](#7-자주-겪는-문제)

---

## 1. Quartz는 어떻게 동작하나 (정적 사이트 원리)

Quartz는 **정적 사이트 생성기**입니다. 서버에서 매번 페이지를 만드는 게 아니라,
`content/` 폴더의 마크다운(`.md`)을 한 번에 HTML로 **빌드**해 `public/` 폴더에 떨궈둡니다.

```
content/  (사이트 소스 = 마크다운)
   │   편집
   ▼
[빌드]  npx quartz build  ── 또는 ── dev 서버가 자동 리빌드
   │
   ▼
public/  (정적 HTML/CSS/JS)
   │   배포(push)
   ▼
공개 사이트 (GitHub Pages)
```

핵심 3단계: **편집 → (빌드 / dev 서버 자동 리빌드) → 배포**

- 편집 중 미리보기는 **dev 서버**(`admin.ps1`)가 파일 저장을 감지해 자동으로 다시 빌드 → `localhost:8080` 갱신.
- 공개 사이트 반영은 **별도 배포**(`deploy.ps1`)가 필요합니다. dev 서버는 내 PC에서만 보입니다.

---

## 2. 문서 편집 — Obsidian으로 쓰고 즉시 미리보기

1. repo 루트에서 **`admin.ps1`** 실행 (PowerShell: `.\admin.ps1`).
   - 8080 포트 정리 → `content/` 를 Obsidian으로 열기 → dev 서버 실행 → 브라우저 자동 열기.
2. Obsidian에서 `content/` 안의 `.md` 파일을 수정하고 **저장**.
   - (처음 한 번) Obsidian에서 `content/` 폴더를 "보관소(vault)로 열기"로 등록해두면 다음부터 매끄럽습니다.
3. `localhost:8080` 이 몇 초 안에 자동 갱신됩니다. (핫리로드)
4. 작업이 끝나면 dev 서버 창에서 **Ctrl + C** 로 종료.

> dev 서버에서 보이는 건 내 PC 한정입니다. 공개 반영은 5번(배포) 참고.

---

## 3. 카테고리(허브) 관리 — 추가 / 이름·순서 변경 / 삭제

카테고리는 **단일 소스**인 `quartz/hubs.ts` 의 `HUBS` 배열 하나가 다스립니다.
이 배열이 **홈 카드 그리드 + 상단 내비게이션**을 동시에 구동합니다.

### 새 카테고리 추가 (두 가지 모두 해야 함)
1. `quartz/hubs.ts` 의 `HUBS` 배열에 **한 줄(항목) 추가**:
   ```ts
   {
     slug: "new-topic",          // URL 경로 + content 폴더명 (영문 kebab-case)
     label: "새 주제",            // 홈 카드 한글 제목
     nav: "새주제",               // 상단 네비 라벨(짧게)
     en: "New Topic",            // 영문 라벨
     desc: "한 줄 설명.",         // 카드 설명
     color: "#cbe3f4",           // 카드 좌측 컬러 bar (hex)
     // tag: "비주력",            // (선택) 제목 옆 배지
   },
   ```
2. **`content/new-topic/index.md`** 폴더와 인덱스 노트 생성 (frontmatter 포함).
   - 두 가지를 모두 해야 **홈 카드 + 네비 링크 + 실제 페이지**가 함께 생깁니다.
   - `hubs.ts` 만 고치면 링크는 생기지만 페이지가 없어 404, 폴더만 만들면 카드·네비에 안 뜸.

### 이름 / 순서 변경
- 라벨 변경: 해당 항목의 `label` / `nav` / `en` / `desc` 수정.
- 순서 변경: `HUBS` 배열 안에서 **항목 순서**를 바꾸면 카드와 네비 순서가 함께 바뀜.
- `slug`(폴더명)을 바꾸면 URL과 폴더 경로가 바뀌므로, `content/<slug>` 폴더명도 같이 변경해야 함(주의: 기존 링크 깨질 수 있음).

### 삭제
1. `quartz/hubs.ts` 에서 해당 항목 줄 제거.
2. `content/<slug>/` 폴더 정리(삭제 또는 보관). 폴더를 남기면 직접 URL로는 접근 가능하지만 카드·네비에서는 사라집니다.

---

## 4. 일반 노트 추가 & 비공개 처리

### 노트 추가
해당 카테고리 폴더(예: `content/agents/`)에 `.md` 파일을 만들고 frontmatter를 넣습니다:
```yaml
---
title: "노트 제목"
tags:
  - type/note
draft: false
---
```
- `draft: false` 여야 발행됩니다.
- 파일명은 영문 kebab-case 권장 (예: `agent-orchestration.md`).

### 비공개 처리 (두 가지 방법)
- **개별 노트**: frontmatter에 `draft: true` → 빌드에서 제외(RemoveDrafts).
- **통째로 숨기기**: `content/private/` 폴더에 두면 발행 제외.
  - `quartz.config.ts` 의 `ignorePatterns: ["private", "templates", ".obsidian", "archive"]` 에 의해
    `private`, `templates`, `.obsidian`, `archive` 는 빌드에서 빠집니다.

---

## 5. 배포 — 공개 사이트에 반영

repo 루트에서 **`deploy.ps1`** 실행:
```powershell
.\deploy.ps1 "콘텐츠 업데이트"   # 메시지 지정 (생략 시 자동 메시지)
.\deploy.ps1 -BuildOnly          # 빌드만, 푸시 안 함
```
동작: `npx quartz build` → (git 원격 있으면) `add` / `commit` / `push`.
- 이 repo는 GitHub 원격 + **GitHub Actions**(`.github/workflows/deploy.yml`)가 연결돼 있어,
  `main` 브랜치에 push되면 자동으로 빌드해 **GitHub Pages**에 게시합니다 (보통 1~2분).
- 원격이 없으면 `deploy.ps1` 은 `public/` 경로와 다음 단계(GitHub Pages / Vercel) 안내만 출력합니다.
- 파괴적 동작(reset/force/삭제)은 하지 않습니다.

---

## 6. 내 메인 볼트(MyWiki)에서 골라 발행하기

평소 글쓰기는 메인 볼트(일반적으로 `ObsidianVault` 안의 MyWiki)에서 하고,
공개할 것만 이 사이트의 `content/` 로 가져오는 흐름이 가능합니다.
구체적 절차는 사이트 안의 파이프라인 문서를 참고하세요:

- `content/obsidian/mywiki-to-quartz-pipeline` (사이트에서 `/obsidian/mywiki-to-quartz-pipeline`)

요약: 메인 볼트에서 작성 → 발행 대상만 선별 → `content/<해당 허브>/` 로 복사 →
frontmatter(`title`/`tags`/`draft:false`) 정리 → `admin.ps1` 로 미리보기 → `deploy.ps1` 로 배포.

---

## 7. 자주 겪는 문제

- **8080이 이미 사용 중**: `admin.ps1` 이 자동으로 기존 프로세스를 정리합니다. 그래도 막히면 PowerShell에서
  `Get-NetTCPConnection -LocalPort 8080` 로 PID 확인 후 `Stop-Process`.
- **카드는 보이는데 클릭하면 404**: `content/<slug>/index.md` 가 없는 경우. 폴더/인덱스 노트를 만드세요.
- **새 글이 사이트에 안 보임**: `draft: true` 이거나 `private`/`archive` 등 무시 폴더에 있는지 확인.
- **변경이 미리보기에 안 뜸**: dev 서버가 켜져 있는지, 파일을 `content/` **안에** 저장했는지 확인.
- **배포했는데 공개 사이트가 그대로**: GitHub Actions 빌드가 끝날 때까지 1~2분 대기, 브라우저 새로고침(캐시).

---

## 관련 파일 한눈에

| 목적 | 파일 |
| --- | --- |
| 관리자 모드(편집+미리보기) 실행 | `admin.ps1` |
| 빌드 & 배포 | `deploy.ps1` |
| 카테고리(허브) 단일 소스 | `quartz/hubs.ts` |
| 홈 히어로 | `content/index.md` |
| 사이트 설정(무시 폴더 등) | `quartz.config.ts` |
| Obsidian vault 설정 | `content/.obsidian/app.json` |
| 발행 파이프라인 | `content/obsidian/mywiki-to-quartz-pipeline.md` |
