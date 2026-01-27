@echo off
REM WebP Conversion Script for Images
REM Requires cwebp tool from Google (https://developers.google.com/speed/webp/download)
REM Install: Download and add to PATH, or use: npm install -g cwebp-bin

echo Converting images to WebP format...

REM Convert images folder
cd images
for %%f in (*.jpg *.jpeg *.png) do (
    echo Converting images/%%f to WebP...
    cwebp -q 80 "%%f" -o "%%~nf.webp"
)
cd ..

echo.
echo Conversion complete!
echo.
echo NOTE: If cwebp is not installed, you can:
echo 1. Download from: https://developers.google.com/speed/webp/download
echo 2. Or use online converter: https://squoosh.app/
echo 3. Or install via npm: npm install -g cwebp-bin
pause
