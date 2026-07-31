Set-Location "F:\repos\asafarim-devtools"

$port = 3200
$listeners = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($listeners) {
    $pids = $listeners | Select-Object -ExpandProperty OwningProcess -Unique
    Write-Host "Port $port is busy; stopping the process(es): $pids" -ForegroundColor Yellow
    $pids | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 1
}

pnpm dev
