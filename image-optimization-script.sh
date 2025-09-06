#!/bin/bash

# Converts PNG images to WebP format with multiple sizes

mkdir -p images_webp/{small,medium,large}

# Function to convert and resize images
convert_images() {
    local input_dir="images_small"
    
    for img in "$input_dir"/*.png; do
        if [ -f "$img" ]; then
            filename=$(basename "$img" .png)
            
            # Small size (400px width)
            cwebp -q 85 -resize 400 0 "$img" -o "images_webp/small/${filename}.webp"
            
            # Medium size (800px width)
            cwebp -q 85 -resize 800 0 "$img" -o "images_webp/medium/${filename}.webp"
            
            # Large size (1200px width)
            cwebp -q 85 -resize 1200 0 "$img" -o "images_webp/large/${filename}.webp"
            
            echo "Converted: $filename"
        fi
    done
}

# Install cwebp if not installed (macOS with Homebrew)
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    brew install webp
fi

# Run conversion
convert_images

echo "Image optimization complete!"
echo "Original PNG total size: $(du -sh images_small | cut -f1)"
echo "WebP small size: $(du -sh images_webp/small | cut -f1)"
echo "WebP medium size: $(du -sh images_webp/medium | cut -f1)"
echo "WebP large size: $(du -sh images_webp/large | cut -f1)"