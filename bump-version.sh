#!/bin/sh
# Hängt an CSS/JS-Verweise eine neue Versionsnummer an, damit Browser nach einem
# Deploy nicht alte, zwischengespeicherte Dateien mit neuem HTML kombinieren.
V=$(date +%Y%m%d%H%M)
for f in *.html; do
  sed -i '' -E "s#(href=\"(assets/fonts|styles)\.css)(\?v=[0-9]+)?\"#\1?v=$V\"#g; s#(src=\"main\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g" "$f"
done
sed -i '' -E "s#url\((fonts/[^)?]+\.woff2)(\?v=[0-9]+)?\)#url(\1?v=$V)#g" assets/fonts.css
echo "Version $V"
