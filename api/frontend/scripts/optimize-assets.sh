#!/bin/sh
# Converts the originals in assets-src/ into WebP under public/assets/.
# Images are scaled to 1280px wide. Needs cwebp and gif2webp (brew install webp). Already converted files are skipped.
set -e
cd "$(dirname "$0")/.."

out() { echo "public/assets/$1/$(basename "$2" | sed 's/\.[^.]*$//' | tr 'A-Z ' 'a-z-').webp"; }

for f in assets-src/images/*.png assets-src/images/*.jpg; do
  [ -f "$f" ] || continue
  o=$(out images "$f")
  [ "$o" -nt "$f" ] || { cwebp -quiet -q 80 -resize 1280 0 "$f" -o "$o" && echo "$o"; }
done

for f in assets-src/gifs/*.gif; do
  [ -f "$f" ] || continue
  o=$(out gifs "$f")
  [ "$o" -nt "$f" ] || { gif2webp -quiet -lossy -q 70 "$f" -o "$o" && echo "$o"; }
done
