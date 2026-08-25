# redeploy.ps1 — one-shot redeploy of asafarim-devtools to the VPS (asafarim.be)
# Archives the repo, uploads it, rebuilds the Docker image remotely, and verifies sites.
# Requires: passwordless SSH configured as `ssh asm`.

$ErrorActionPreference = 'Stop'
$RepoDir     = $PSScriptRoot
$RepoName    = 'asafarim-devtools'
$SshHost     = 'asm'
$ArchiveName = "$RepoName.tar.gz"
$Archive     = Join-Path $env:TEMP $ArchiveName
$RemoteDir   = "/var/repos/$RepoName"

function Invoke-Step([string]$Label, [scriptblock]$Action) {
    Write-Host "`n=== $Label ===" -ForegroundColor Cyan
    & $Action
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $Label (exit $LASTEXITCODE)" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

try {
    Invoke-Step '1/5 Creating source archive' {
        Push-Location $env:TEMP
        try {
            tar -czf $ArchiveName --exclude=node_modules --exclude=.next --exclude=.git -C $RepoDir .
        }
        finally {
            Pop-Location
        }
    }

    Invoke-Step '2/5 Uploading to VPS' {
        scp $Archive "${SshHost}:/tmp/"
    }

    Invoke-Step '3/5 Extracting and rebuilding on VPS' {
        ssh $SshHost "mkdir -p $RemoteDir && tar -xzf /tmp/$RepoName.tar.gz -C $RemoteDir && rm /tmp/$RepoName.tar.gz && cd $RemoteDir && docker compose up -d --build"
    }

    # Scoped cleanup: only THIS project's dangling images + build cache unused for 7+ days.
    # Running containers and asafarim-com images are never touched.
    Invoke-Step '4/5 Pruning stale Docker layers' {
        ssh $SshHost "docker image prune -f --filter label=com.docker.compose.project=$RepoName; docker builder prune -f --filter until=168h 2>&1 | tail -1; df -h / | tail -1"
    }

    Invoke-Step '5/5 Verifying sites' {
        ssh $SshHost "echo -n 'asafarim.be:  '; curl -s -o /dev/null -w '%{http_code}\n' https://asafarim.be; echo -n 'asafarim.com: '; curl -s -o /dev/null -w '%{http_code}\n' https://asafarim.com"
    }

    Write-Host "`nRedeploy complete: https://asafarim.be" -ForegroundColor Green
}
finally {
    if (Test-Path $Archive) { Remove-Item $Archive -Force }
}
