# 근성쌤 AI 지식허브 — 작업 인계서 (HANDOFF)

> 다른 AI가 이 작업을 이어받기 위한 문서. 작성: 2026-06-28. 사용자=권태향(근성쌤), 회사=REUEL MASION.
> **먼저 이 문서를 끝까지 읽고, 아래 "읽어야 할 자료"를 순서대로 본 뒤 작업하라.**

---

## 0. 한 줄 요약 / 너의 역할
**근성쌤(권태향)의 개인 "AI 전문가 지식허브 겸 블로그"** 를 **Quartz(정적 사이트)** 로 만들고 운영 중이다.
콘텐츠 원천은 Obsidian, 발행은 Quartz, 배포는 GitHub Pages 자동배포. 너는 기획·구현·검증 시 **삼권분립(Planner/Creator/Tester 세션 격리)** 을 지키고, **공개 사이트라 보안 가드레일(아래 7번)을 절대 준수**하라.

---

## 1. 핵심 경로 (폴더/파일)

### 사이트 본체 (코드 루트)
- **`D:\01_Projects\13_quartz-mywiki-site`** — Quartz **4.5.2** 사이트(=이 리포). 여기서 빌드/편집/배포.
  - `content\` — 발행 콘텐츠(.md). 허브 폴더 10개: `agents, harness, obsidian, local-llm, startup-ai, company-intel, products, projects, ai-interior, about` + `archive\`(발행 제외) + `.obsidian\`(옵시디언 보관소 설정)
  - **`quartz\hubs.ts`** — ⭐카테고리(허브) **단일 데이터 소스**. 이 배열이 홈 카드(HubGrid)+상단 네비(Nav)를 동시에 구동. **새 카테고리 = 여기 한 줄 추가 + `content\<slug>\index.md` 폴더 생성**.
  - `quartz\components\HubGrid.tsx` — 홈 히어로 아래 허브 카드 그리드(hubs.ts map). `quartz\components\Nav.tsx` — 상단 네비(hubs.ts map). 둘 다 `quartz\components\index.ts`에 등록됨.
  - `quartz\components\Head.tsx` — Pretendard 폰트 CDN `<link>` 주입.
  - `quartz.config.ts` — 사이트 설정(pageTitle "근성쌤 · AI 지식허브", baseUrl `capernaum-user.github.io/geunseong-ai-hub`, 따뜻한 에디토리얼 컬러 light/dark, 코드폰트 JetBrains Mono, `ignorePatterns: ["private","templates",".obsidian","archive"]`).
  - `quartz.layout.ts` — 레이아웃. 홈(slug==="index")에서만 HubGrid를 afterBody로 렌더, 홈에선 ArticleTitle/ContentMeta/TagList 숨김(ConditionalRender).
  - `quartz\styles\custom.scss` — 디자인 토큰(따뜻한 에디토리얼), Pretendard `--bodyFont/--headerFont` 오버라이드(html:root specificity), 히어로/hub-card 스타일, 카드 stagger(@for 최대 24, 카테고리 수 자동 대응).
  - `content\index.md` — 홈. **히어로(eyebrow/H1/lead/meta)만 마크다운에 있고, 허브 카드는 HubGrid 컴포넌트가 렌더**(하드코딩 아님).
  - **`admin.ps1`** — 관리자 모드 런처(8080 정리→옵시디언으로 content 열기→`quartz build --serve` 핫리로드→브라우저). **지속 편집은 사용자가 자기 터미널에서 이걸 실행.**
  - **`deploy.ps1`** — `quartz build` 후 git add/commit/push(→GitHub Actions 자동배포). `-BuildOnly` 옵션.
  - **`ADMIN-GUIDE.md`** — 한국어 운영 가이드(편집/카테고리관리/배포/문제해결). content\ 밖이라 발행 안 됨.
  - `content\obsidian\mywiki-to-quartz-pipeline.md` — MyWiki→Quartz 발행 파이프라인(개념) 노트.
  - `.github\workflows\deploy.yml` — main push 시 Pages 자동 배포.

### 콘텐츠 DB (원천) — 읽기 전용, 원본 수정 금지
- **`C:\Users\권태향\OneDrive\바탕 화면\MyWiki`** — Obsidian 위키. `visibility/public` 태그가 발행 게이트(개념). 단방향(위키→사이트) 복사만.

### 시안/기획 산출물
- **`D:\01_Projects\geunseong-homepage-design`** — zip 시안 원본 + 기획 HTML. (`근성쌤 홈페이지.dc.html`=채택 시안, `REUEL MASION.dc.html`+Aether=회사용 글래스 시안(미사용), `geunseong-ai-hub_plan-v2-quartz.html`=v2 기획 시각화)

### Vault 문서/기록
- `D:\ObsidianVault\01_projects\geunseong-devlog\analysis-design.md`, `detailed-plan.md` — **v1 기획(Hugo·"데이터 분석가" 가정) → 현재 방향과 다름(SUPERSEDED). 역사 참고만.**
- `D:\ObsidianVault\03_ai_notes\work-logs\claude\claude-work-diary.md` — 2026-06-28 항목들에 전 작업 경과.
- Claude 메모리: `geunseong-ai-hub-quartz` 노트(요지: Hugo→Quartz 피벗, REUEL MASION 맥락, 지식블로그 작업은 13_quartz-mywiki-site에서).

### 보류/제외
- `D:\01_Projects\geunseong-devlog` — **v1 Hugo 사이트, 보류(_HOLD). 절대 건드리지 말 것.**

---

## 2. 읽어야 할 자료 (이 순서대로)
1. **이 문서(HANDOFF.md)** — 전체 맥락
2. **`ADMIN-GUIDE.md`** — 사이트 운영/편집/배포 방식
3. **`quartz\hubs.ts`** — 카테고리 구조(단일 소스)
4. `quartz.config.ts` + `quartz.layout.ts` — 설정·레이아웃
5. `quartz\components\HubGrid.tsx`, `Nav.tsx`, `Head.tsx` + `quartz\styles\custom.scss` — 커스텀 UI/테마
6. `content\index.md` + 허브 인덱스 몇 개(`content\harness\index.md`, `content\projects\index.md`, `content\company-intel\index.md`)
7. `content\obsidian\mywiki-to-quartz-pipeline.md` — 발행 모델
8. Vault: 메모리 `geunseong-ai-hub-quartz` + 작업일지 2026-06-28
9. (배경/선택) v1 기획 `geunseong-devlog\{analysis-design,detailed-plan}.md`(superseded), 시안 `geunseong-homepage-design\`

---

## 3. 현재 상태
- **빌드 green**: `npx quartz build` → 193 파일 emit, tsc 0, 내부 링크 0 broken. 콘텐츠 ~50개 .md, 전부 한국어.
- **허브 10개** 데이터구동 완료(hubs.ts). 홈 카드/네비 동일 소스.
- **보안 sanitize 완료**: 발행 콘텐츠에 로컬 절대경로(D:\, C:\)·자격증명·이메일 0건. 실명 권태향은 본인 사이트 의도적 공개정보(about/footer).
- **배포 상태**: 사용자가 직접 커밋·푸시함 → `git remote origin = https://github.com/Capernaum-user/geunseong-ai-hub.git`, HEAD==origin/main(`72feb5a "Initial deploy"`). **라이브 ≈ https://capernaum-user.github.io/geunseong-ai-hub/**
- ⚠️ **미커밋(working tree)**: 데이터구동 리팩터(hubs.ts/HubGrid/Nav/layout/index.md/custom.scss) + admin.ps1/deploy.ps1/ADMIN-GUIDE.md/.obsidian. **아직 라이브 미반영.** 푸시(=공개 배포)는 outward 작업 → **사용자 명시 승인 후에만** 하라.

---

## 4. 빌드/실행 명령 (cd `D:\01_Projects\13_quartz-mywiki-site`)
- 빌드: `npx quartz build` (산출물 `public\`)
- 핫리로드 미리보기: `npx quartz build --serve` → http://localhost:8080 (또는 `admin.ps1`)
- 배포: `deploy.ps1`(빌드+푸시→Actions 자동) — **사용자 승인 후**
- 요구사항: Node 22+(현재 v24), npm. Quartz **4.5.2**(v5 아님).

---

## 5. 아키텍처 핵심
- **MyWiki(Obsidian)=지식 DB → `visibility/public`로 선별 → Quartz `content\`로 단방향 복사 → 빌드 → Pages 배포.** 런타임 DB 아님(빌드타임 동기화). 전체 자동 미러 금지(민감정보 보호).
- **카테고리 = 데이터구동**: `hubs.ts` 1곳 수정으로 홈+네비 동시 변경. 새 카테고리는 hubs.ts 한 줄 + `content\<slug>\index.md` 둘 다 필요.
- **편집 루프**: content\의 .md 수정 → dev서버가 자동 리빌드(미리보기) → 푸시 시 라이브 반영. content\를 옵시디언 보관소로 열어 편집 가능(.obsidian 포함, 발행 제외).
- **Quartz 발행 게이트는 사실상 `draft:true`만**(visibility/public은 우리 콘텐츠 관례, Quartz가 강제하진 않음). archive\는 ignorePatterns로 제외.

---

## 6. 가드레일 (절대 준수)
- 🔴 **`D:\01_Projects\codex-hub` 절대 읽지도 발행하지도 말 것** — Google 자격증명(token.json 등) 포함.
- 🔒 **발행 제외(민감) 프로젝트**: GRIT_Claude_Project, Guesthouse, mark-ai-studio, nexus v2~v4, AI_Control, "Peperclip과 AI회사운영OS", instagram-interior-business의 수익모델/고객 세부. → 공개 사이트에 넣지 말 것.
- 발행 콘텐츠에 **로컬 절대경로·자격증명·토큰·이메일·PII·사업기밀(가격/매출/실고객명) 금지.** 외부 자료는 원문 복붙 말고 공개용으로 재작성.
- **원본 보존**: zip 원본·MyWiki 원본·`geunseong-devlog`(보류) 수정 금지. 발행은 단방향.
- **삼권분립**: 기획/구현/검증 세션(또는 서브에이전트) 격리. 구현 후 독립 검증.
- **푸시=공개 배포(outward)** → 사용자 승인 없이 하지 말 것.
- 네이밍/저장 규칙은 사용자 전역 `CLAUDE.md`(D:\ 및 Vault 규칙) 및 부트 프로토콜 준수. 작업 후 작업일지 갱신.

---

## 7. 다음 작업 후보 / 미해결
1. **(승인 시) 미커밋 변경 커밋·푸시** → 데이터구동 카테고리+관리자 도구를 라이브 반영.
2. 라이브 Pages 사이트 실제 렌더 점검(baseUrl·OG·RSS·다크모드·모바일).
3. **D4 확정**: REUEL MASION ↔ 기존 "공간브리핑"(instagram-interior-business)이 동일 브랜드인지/톤(프리미엄 vs 실용) — 사용자 확인 필요.
4. 허브별 콘텐츠 보강(현재 시드 수준). 프로젝트 허브에 추가 후보(공개적합) 더 넣기.
5. content\ 파일 git 추적(빌드 시 "isn't tracked by git" 날짜 경고 해소).
6. (선택) MyWiki→Quartz 발행 자동화 스킬/스크립트 구체화.

---

## 8. 함정/주의
- Quartz **4.5.2** — 파셜/홈 구조가 Hugo와 다름. 문서: https://quartz.jzhao.xyz
- 폰트: Pretendard는 Head.tsx `<link>` + custom.scss `html:root --bodyFont` 오버라이드로 적용(특이도로 Quartz 기본을 이김). 건드릴 때 깨지지 않게.
- 홈은 특수 페이지: 히어로=content\index.md, 카드=HubGrid(afterBody, slug==="index" 한정). 다른 페이지엔 HubGrid 미렌더.
- 백그라운드 dev서버는 세션 턴 종료 시 죽는 경향 → 지속 편집은 사용자가 직접 `admin.ps1`.
