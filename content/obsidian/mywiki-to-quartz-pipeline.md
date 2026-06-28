---
title: MyWiki(Obsidian)에서 Quartz로 발행하는 파이프라인
category: obsidian
tags:
  - 지식관리
  - Obsidian
  - Quartz
  - 생성형AI
  - visibility/public
  - type/reference
  - has-diagram
created: 2026-06-28
updated: 2026-06-28
draft: false
summary: "Obsidian 위키(MyWiki)를 단일 진실원으로 두고, visibility/public 태그가 붙은 노트만 Quartz 정적 사이트로 단방향 발행하는 구조. Hugo 파이프라인보다 매핑 단계를 단순화하고, [[위키링크]]와 그래프를 그대로 살린다."
---

# MyWiki(Obsidian)에서 Quartz로 발행하는 파이프라인

이 사이트는 **위키가 원천(DB), Quartz가 발행물(렌더러)** 이라는 두 역할 분리 위에서 동작한다. 둘 사이의 연결은 SQL 같은 런타임 연결이 아니라 **빌드타임 콘텐츠 동기화**다. 그래서 위키는 자유롭게 쌓고, 노출은 태그 하나로 통제한다.

> [!note] Hugo 파이프라인과의 차이
> 예전 Hugo 발행 파이프라인 (보관됨)은 위키 프론트매터를 Hugo 스키마(`created→date`, 도메인 태그→`categories`)로 변환하는 매핑 단계가 무거웠다. Quartz는 **Obsidian 마크다운을 거의 그대로 읽기 때문에** 그 변환 계층 대부분이 사라진다. `[[위키링크]]`·백링크·그래프가 빌드에서 자동으로 살아나는 것이 핵심 이득이다.

## 흐름 (5단계)

1. **수집(ingest)** — 거친 노트를 위키에 떨구고 distill해 허브(`agents`·`harness`·`obsidian` 등) 아래 노트로 승격한다. 모든 노트는 `title/tags/created/updated` 프론트매터와 `[[위키링크]]`를 가진다.
2. **발행 게이트** — `tags`에 `visibility/public`이 있는 노트만 사이트로 나간다. `visibility/internal`·`visibility/pii`·무표식은 위키에만 남는다. **`pii`는 어떤 경우에도 발행하지 않는다.** Quartz는 추가로 `draft: true`인 노트를 빌드에서 제외하므로, 발행 노트는 `draft: false`(또는 생략)로 둔다.
3. **단방향 복사** — 발행 대상 노트를 `content/<hub>/<slug>.md`로 복사한다. **사이트→위키 역기록은 금지**(원본 보존). 파일명은 영문 kebab-case, 본문은 한국어.
4. **링크·그래프 자동화** — `[[위키링크]]`를 손으로 치환하지 않는다. Quartz가 빌드 시 내부 링크로 해석하고, 끊긴 링크·백링크·그래프 뷰를 자동 생성한다. 위키에서 쓰던 연결 구조가 사이트에서 그대로 탐색 가능해진다.
5. **빌드·배포** — 로컬에서 `npx quartz build`로 검증한 뒤 `main`에 **git push**하면 **GitHub Actions가 자동으로 빌드·배포**한다(GitHub Pages). 같은 산출물로 다른 정적 호스팅(Vercel 등)도 가능.

## 배포 자동화 시퀀스

```mermaid
sequenceDiagram
    participant OB as Obsidian (content/)
    participant QZ as Quartz (로컬 미리보기)
    participant GH as GitHub + Actions

    OB->>OB: 노트 작성 / 수정 (.md)
    OB->>OB: visibility/public · draft 여부 확인
    OB->>QZ: npx quartz build --serve (로컬 미리보기 · 선택)
    QZ-->>OB: localhost:8080 핫리로드 확인
    OB->>GH: git push (소스 커밋)
    GH->>GH: GitHub Actions가 npx quartz build → Pages 배포
    GH-->>OB: 라이브 사이트 공개
    Note over QZ,GH: 마크다운 파싱·위키링크·그래프는 빌드 시 처리,<br/>Mermaid 다이어그램은 브라우저에서 렌더
```
*위 시퀀스 다이어그램은 노트 수정 → (선택) 로컬 미리보기 → `git push` → GitHub Actions 자동 빌드·배포까지의 단계를 보여줍니다. 실제 발행 트리거는 `main` 브랜치 push다.*


```bash
# Quartz 빌드 (Git Bash)
cd <repo-root> && npx quartz build
```

## 원칙

- **단일 진실원** — 지식은 위키에만 쌓고, 노출만 `visibility` 태그로 통제한다.
- **단방향** — 사이트는 항상 위키의 하위 사본이다. 사이트에서 고친 내용을 위키로 되돌려 쓰지 않는다.
- **변환 최소화** — Quartz가 Obsidian 호환이므로, 프론트매터·링크를 억지로 변형하지 않는다. 변형이 적을수록 발행 노트와 원본의 드리프트가 줄어든다.
- **안정성 우선** — 무거운 모션·외부 위젯을 피하고 정적 산출물의 성능·안정성을 유지한다. (`prefers-reduced-motion` 존중)
- **보안** — API키·토큰·PII는 노트에 넣지 않는다. 발행 게이트 이전 단계에서 차단한다.

## 체크리스트

- [ ] 발행할 노트에 `visibility/public` 태그가 있는가
- [ ] `draft: true`가 아닌가 (`draft: false` 또는 생략)
- [ ] PII·시크릿이 본문/프론트매터에 없는가
- [ ] 파일명이 영문 kebab-case `.md`인가
- [ ] `[[위키링크]]`를 평문으로 깨뜨리지 않았는가
- [ ] `npx quartz build` 에러 0인가

## Related

- [[obsidian/obsidian-vault|Obsidian Vault]]
- [[obsidian/ai-plugins|Obsidian + 생성형 AI 플러그인]]
- 구버전: Hugo 발행 파이프라인 (보관됨)
