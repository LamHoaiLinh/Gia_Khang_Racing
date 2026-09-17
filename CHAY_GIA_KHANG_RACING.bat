@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Gia Khang Racing
where py >nul 2>nul
if %errorlevel%==0 (
  py local_server.py
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python local_server.py
  goto :eof
)
echo Khong tim thay Python tren may.
echo Cai Python hoac mo terminal tai thu muc game va chay mot local web server.
pause
