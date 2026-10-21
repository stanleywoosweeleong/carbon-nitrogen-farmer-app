@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if not errorlevel 1 (
  node "%~dp0server.mjs"
  goto end
)
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "%~dp0server.mjs"
  goto end
)
where py >nul 2>nul
if not errorlevel 1 (
  echo Open http://127.0.0.1:8840/ in your browser. Keep this window open.
  py -3 -m http.server 8840 --bind 127.0.0.1 --directory "%~dp0dist"
  goto end
)
where python >nul 2>nul
if not errorlevel 1 (
  echo Open http://127.0.0.1:8840/ in your browser. Keep this window open.
  python -m http.server 8840 --bind 127.0.0.1 --directory "%~dp0dist"
  goto end
)
echo Install Node.js or Python 3, then run this launcher again.
:end
pause
