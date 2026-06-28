# ============================================================================
#  admin.ps1  --  "관리자 모드" 런처 (Quartz MyWiki 사이트)
# ----------------------------------------------------------------------------
#  하는 일 (순서대로):
#    (a) 8080 포트를 점유한 기존 프로세스가 있으면 정리
#    (b) content\ 폴더를 Obsidian 으로 열기 시도 (obsidian:// URI → 실패 시 탐색기)
#    (c) 이 repo 폴더에서  npx quartz build --serve  실행 (핫리로드 dev 서버)
#    (d) 기본 브라우저로 http://localhost:8080 열기
#
#  사용법:
#    PowerShell 에서      ▶  .\admin.ps1
#    탐색기에서           ▶  admin.ps1 우클릭 → "PowerShell에서 실행"
#
#  종료:  이 창에서 Ctrl + C  (dev 서버가 멈춤)
#
#  메모: content\ 를 Obsidian "보관소(vault)"로 한 번 등록해두면
#        편집 → 저장 시 localhost:8080 이 자동 갱신됩니다.
#        (공개 사이트 반영은 deploy.ps1 로 별도 배포)
# ============================================================================

$ErrorActionPreference = "Stop"

# 이 스크립트가 있는 폴더 = repo 루트
$RepoRoot    = $PSScriptRoot
$ContentPath = Join-Path $RepoRoot "content"
$Port        = 8080
$Url         = "http://localhost:$Port"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Quartz MyWiki  ·  관리자 모드 (dev 서버)" -ForegroundColor Cyan
Write-Host "  repo: $RepoRoot" -ForegroundColor DarkGray
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# ── (a) 8080 포트 정리 ──────────────────────────────────────────────────────
Write-Host "[1/4] 포트 $Port 점유 프로세스 확인..." -ForegroundColor Yellow
try {
    $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($conns) {
        $pids = $conns.OwningProcess | Sort-Object -Unique
        foreach ($procId in $pids) {
            try {
                $p = Get-Process -Id $procId -ErrorAction Stop
                Write-Host "      → 종료: PID $procId ($($p.ProcessName))" -ForegroundColor DarkYellow
                Stop-Process -Id $procId -Force -ErrorAction Stop
            } catch {
                Write-Host "      → PID $procId 종료 실패 (무시): $($_.Exception.Message)" -ForegroundColor DarkGray
            }
        }
        Start-Sleep -Milliseconds 600
    } else {
        Write-Host "      → 점유 없음." -ForegroundColor DarkGray
    }
} catch {
    Write-Host "      → 포트 확인 건너뜀: $($_.Exception.Message)" -ForegroundColor DarkGray
}

# ── (b) content\ 를 Obsidian 으로 열기 ──────────────────────────────────────
Write-Host "[2/4] content\ 를 Obsidian 으로 여는 중..." -ForegroundColor Yellow
$opened = $false
try {
    # obsidian://open?path=<URL 인코딩된 절대경로>
    Add-Type -AssemblyName System.Web -ErrorAction SilentlyContinue
    $encoded = [System.Uri]::EscapeDataString($ContentPath)
    $uri = "obsidian://open?path=$encoded"
    Start-Process $uri -ErrorAction Stop
    $opened = $true
    Write-Host "      → Obsidian URI 호출 성공." -ForegroundColor DarkGray
} catch {
    Write-Host "      → Obsidian URI 실패, 탐색기로 대체합니다." -ForegroundColor DarkGray
}
if (-not $opened) {
    try {
        Start-Process explorer.exe $ContentPath
        Write-Host "      → 탐색기로 content\ 를 열었습니다." -ForegroundColor DarkGray
    } catch {
        Write-Host "      → content\ 열기 실패 (무시): $($_.Exception.Message)" -ForegroundColor DarkGray
    }
}

# ── (d 준비) dev 서버가 뜬 뒤 브라우저를 열도록 백그라운드 잡 예약 ───────────
Write-Host "[3/4] $Url 자동 열기 예약 (서버 준비 후)..." -ForegroundColor Yellow
Start-Job -ScriptBlock {
    param($u, $p)
    for ($i = 0; $i -lt 40; $i++) {
        Start-Sleep -Seconds 1
        try {
            $c = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue
            if ($c) { Start-Process $u; break }
        } catch {}
    }
} -ArgumentList $Url, $Port | Out-Null

# ── (c) dev 서버 실행 (포그라운드, Ctrl+C 로 종료) ──────────────────────────
Write-Host "[4/4] dev 서버 시작:  npx quartz build --serve" -ForegroundColor Yellow
Write-Host "      (종료하려면 이 창에서 Ctrl + C)" -ForegroundColor DarkGray
Write-Host ""
Set-Location $RepoRoot
& npx quartz build --serve
