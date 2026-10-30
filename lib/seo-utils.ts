import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Strips HTML tags and decodes common HTML entities
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generates a clean URL slug from title
 */
export function generateSlug(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculates reading time in minutes from text or HTML
 */
export function calculateReadTime(content: string): string {
  const plainText = stripHtml(content);
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `~${minutes} min${minutes > 1 ? "s" : ""}`;
}

/**
 * Calibrates Meta Title: Targets 45–60 characters ending with " | XCEL STIRO"
 */
export function calibrateMetaTitle(title: string, fallback = "Industrial Laundry Equipment"): string {
  const brandSuffix = " | XCEL STIRO";
  const targetMax = 60;

  let base = (title || fallback).trim().replace(/\s*\|\s*XCEL STIRO$/i, "").trim();
  const maxBaseLength = targetMax - brandSuffix.length;
  if (base.length > maxBaseLength) {
    let truncated = base.substring(0, maxBaseLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 20) {
      truncated = truncated.substring(0, lastSpace);
    }
    base = truncated.trim();
  }

  return `${base}${brandSuffix}`;
}

/**
 * Calibrates Meta Description: Extracts 140–160 chars of clean summary
 */
export function calibrateMetaDescription(content: string, title?: string): string {
  const plainText = stripHtml(content);
  if (!plainText) {
    return title ? `${title}. Discover technical specifications, operational cost models, and industrial insights from XCEL STIRO.` : "";
  }

  if (plainText.length <= 160) {
    return plainText;
  }

  let truncated = plainText.substring(0, 157);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 80) {
    truncated = truncated.substring(0, lastSpace);
  }
  return `${truncated}...`;
}

/**
 * Automatically extracts 3-4 key takeaway bullet points from HTML
 * for Xcel's left sidebar "The Short Version" box
 */
export function extractShortVersion(html: string, maxItems = 4): string[] {
  if (!html) return [];

  const points: string[] = [];

  // Try extracting from <li> items first
  const liRegex = /<li\b[^>]*>(.*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(html)) !== null && points.length < maxItems) {
    const text = stripHtml(match[1]);
    if (text && text.length > 20 && text.length < 240) {
      points.push(text);
    }
  }

  // If no <li> found, extract from first few <p> tags
  if (points.length === 0) {
    const pRegex = /<p\b[^>]*>(.*?)<\/p>/gi;
    while ((match = pRegex.exec(html)) !== null && points.length < maxItems) {
      const text = stripHtml(match[1]);
      if (text && text.length > 30) {
        // Take first sentence or up to 160 chars
        const sentence = text.split(/(?<=[.?!])\s+/)[0] || text.substring(0, 150);
        points.push(sentence.trim());
      }
    }
  }

  return points.slice(0, maxItems);
}

/**
 * Compresses an image file on the client using HTML5 Canvas
 */
export async function compressImage(file: File, maxDimension = 1600, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.createImageBitmap) {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);

    img.onload = () => {
      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image to Firebase Storage with compression
 */
export async function uploadBlogImage(
  file: File,
  folder = "blog-images"
): Promise<string> {
  const compressedBlob = await compressImage(file, 1600, 0.82);
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${folder}/${Date.now()}_${sanitizedName}.webp`;
  const storageRef = ref(storage, fileName);

  const snapshot = await uploadBytes(storageRef, compressedBlob, {
    contentType: "image/webp",
  });

  return await getDownloadURL(snapshot.ref);
}
