# ============================================================================
#  deploy.ps1  --  Quartz 정적 사이트 빌드 & 배포 (비파괴)
# ----------------------------------------------------------------------------
#  하는 일 (순서대로):
#    1) npx quartz build      → public\ 에 정적 사이트 생성
#    2) git 원격(remote)이 있으면:  git add -A → commit → push
#       (커밋 메시지는 첫 번째 인자, 없으면 자동 메시지)
#    3) git 원격이 없으면:  public\ 경로와 다음 배포 단계 안내만 출력
#
#  이 스크립트는 파괴적 동작(reset/force/삭제)을 하지 않습니다.
#
#  사용법:
#    .\deploy.ps1                       # 자동 커밋 메시지로 빌드+푸시
#    .\deploy.ps1 "콘텐츠 업데이트"      # 지정한 메시지로 빌드+푸시
#    .\deploy.ps1 -BuildOnly            # 빌드만 (커밋/푸시 안 함)
# ============================================================================

param(
    [string]$Message = "",
    [switch]$BuildOnly
)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot
Set-Location $RepoRoot

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Quartz MyWiki  ·  배포 (build & deploy)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# ── 1) 빌드 ─────────────────────────────────────────────────────────────────
Write-Host "[1/3] 빌드:  npx quartz build" -ForegroundColor Yellow
& npx quartz build
if ($LASTEXITCODE -ne 0) {
    Write-Host "빌드 실패 (exit $LASTEXITCODE). 배포를 중단합니다." -ForegroundColor Red
    exit 1
}
$PublicPath = Join-Path $RepoRoot "public"
Write-Host "      → 빌드 완료:  $PublicPath" -ForegroundColor Green

if ($BuildOnly) {
    Write-Host ""
    Write-Host "[빌드 전용] 커밋/푸시를 건너뜁니다." -ForegroundColor DarkGray
    exit 0
}

# ── 2) git 원격 확인 ────────────────────────────────────────────────────────
Write-Host "[2/3] git 원격(remote) 확인..." -ForegroundColor Yellow
$isGit = $false
try {
    git rev-parse --is-inside-work-tree 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $isGit = $true }
} catch {}

$remoteUrl = ""
if ($isGit) {
    $remoteUrl = (git remote get-url origin 2>$null)
}

if (-not $isGit -or [string]::IsNullOrWhiteSpace($remoteUrl)) {
    # ── 3a) 원격 없음 → 안내만 출력 ─────────────────────────────────────────
    Write-Host "      → git 원격이 없습니다. 푸시를 건너뜁니다." -ForegroundColor DarkYellow
    Write-Host ""
    Write-Host "[3/3] 다음 단계 안내" -ForegroundColor Yellow
    Write-Host "  빌드 결과(정적 사이트) 경로:" -ForegroundColor Gray
    Write-Host "    $PublicPath" -ForegroundColor White
    Write-Host ""
    Write-Host "  배포 방법 (택1):" -ForegroundColor Gray
    Write-Host "   - GitHub Pages: 이 repo 를 GitHub 에 올리고 origin 연결 후 다시 실행" -ForegroundColor Gray
    Write-Host "       git remote add origin <repo-url>" -ForegroundColor DarkGray
    Write-Host "   - Vercel:  public\ 를 출력 디렉터리로 지정하거나 repo 를 import" -ForegroundColor Gray
    Write-Host "   - 임시 확인:  npx quartz build --serve  (로컬 미리보기)" -ForegroundColor Gray
    exit 0
}

Write-Host "      → 원격: $remoteUrl" -ForegroundColor DarkGray

# ── 3b) 커밋 & 푸시 ─────────────────────────────────────────────────────────
Write-Host "[3/3] git add / commit / push" -ForegroundColor Yellow

git add -A
# 스테이징된 변경이 없으면 커밋 생략
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "      → 변경 사항 없음. 커밋을 건너뜁니다." -ForegroundColor DarkGray
} else {
    if ([string]::IsNullOrWhiteSpace($Message)) {
        $Message = "content: update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
    }
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        Write-Host "커밋 실패 (exit $LASTEXITCODE)." -ForegroundColor Red
        exit 1
    }
    Write-Host "      → 커밋: `"$Message`"" -ForegroundColor Green
}

# 현재 브랜치 푸시
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "      → push origin $branch ..." -ForegroundColor DarkGray
git push origin $branch
if ($LASTEXITCODE -ne 0) {
    Write-Host "푸시 실패 (exit $LASTEXITCODE). 원격 권한/네트워크를 확인하세요." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "배포 완료. (GitHub Actions/Pages 사용 시 원격에서 게시까지 1~2분 소요될 수 있음)" -ForegroundColor Green
