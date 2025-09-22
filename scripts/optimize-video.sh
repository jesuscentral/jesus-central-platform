#!/bin/bash

# Video Optimization Script for JCC Landing Page
# Usage: ./scripts/optimize-video.sh input.mp4

if [ $# -eq 0 ]; then
    echo "Usage: $0 <input-video.mp4>"
    exit 1
fi

INPUT_VIDEO=$1
OUTPUT_DIR="public"
FILENAME=$(basename "$INPUT_VIDEO" .mp4)

echo "🎬 Optimizing video: $INPUT_VIDEO"

# Create MP4 version (H.264) - widely supported
echo "📹 Creating optimized MP4..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -profile:v high \
  -level 4.0 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale='min(1920,iw)':min'(1080,ih)':force_original_aspect_ratio=decrease" \
  "$OUTPUT_DIR/${FILENAME}-optimized.mp4" \
  -y

# Create WebM version (VP9) - better compression
echo "📹 Creating WebM version..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  -b:a 128k \
  -vf "scale='min(1920,iw)':min'(1080,ih)':force_original_aspect_ratio=decrease" \
  "$OUTPUT_DIR/${FILENAME}-optimized.webm" \
  -y

# Extract poster frame (at 1 second)
echo "🖼️  Extracting poster frame..."
ffmpeg -i "$INPUT_VIDEO" \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale='min(1920,iw)':min'(1080,ih)':force_original_aspect_ratio=decrease" \
  "$OUTPUT_DIR/${FILENAME}-poster.jpg" \
  -y

# Show file sizes
echo "✅ Optimization complete!"
echo "📊 File sizes:"
ls -lh "$INPUT_VIDEO" "$OUTPUT_DIR/${FILENAME}-optimized.mp4" "$OUTPUT_DIR/${FILENAME}-optimized.webm" "$OUTPUT_DIR/${FILENAME}-poster.jpg" | awk '{print $9 ": " $5}'
