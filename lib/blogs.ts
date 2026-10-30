import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";
import { BLOG_ARTICLES, BlogArticle, BlogSection, BlogBullet, BlogTable, getArticleBySlug } from "@/data/blogs";

export type { BlogArticle, BlogSection, BlogBullet, BlogTable };

export interface AdminBlogArticle extends BlogArticle {
  status?: "published" | "draft";
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Merge Firestore blogs with the 4 default system blogs so that
 * the core industry insights blogs are never lost.
 */
export function mergeWithDefaultBlogs(firestoreBlogs: AdminBlogArticle[]): AdminBlogArticle[] {
  const existingSlugs = new Set(firestoreBlogs.map((b) => b.slug?.toLowerCase().trim()));
  const missingDefaults: AdminBlogArticle[] = [];

  for (const defaultArt of BLOG_ARTICLES) {
    if (!existingSlugs.has(defaultArt.slug.toLowerCase().trim())) {
      missingDefaults.push({
        ...defaultArt,
        id: `default-${defaultArt.id}`,
        status: "published",
      });
    }
  }

  return [...firestoreBlogs, ...missingDefaults];
}

/**
 * Fetch all blogs from Firestore merged with default blogs.
 */
export async function getBlogs(): Promise<AdminBlogArticle[]> {
  try {
    const blogsCollection = collection(db, "blogs");
    const querySnapshot = await getDocs(blogsCollection);

    const firestoreBlogs: AdminBlogArticle[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnap: any) => {
        const data = docSnap.data();
        firestoreBlogs.push({
          id: docSnap.id,
          ...data,
        } as AdminBlogArticle);
      });

      // Sort by createdAt descending if available
      firestoreBlogs.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
        return timeB - timeA;
      });
    }

    return mergeWithDefaultBlogs(firestoreBlogs);
  } catch (error) {
    console.error("Error fetching blogs from Firestore, using static defaults:", error);
    return BLOG_ARTICLES.map((art) => ({
      ...art,
      id: `default-${art.id}`,
      status: "published" as const,
    }));
  }
}

/**
 * Fetch a single blog by slug from Firestore.
 * Falls back to static BLOG_ARTICLES if not found or on error.
 */
export async function getBlogBySlugFromDb(slug: string): Promise<AdminBlogArticle | null> {
  const normalized = slug.toLowerCase().trim();

  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", normalized));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as AdminBlogArticle;
    }

    // Also check aliases in Firestore
    const aliasQuery = query(blogsRef, where("aliases", "array-contains", normalized));
    const aliasSnapshot = await getDocs(aliasQuery);
    if (!aliasSnapshot.empty) {
      const docSnap = aliasSnapshot.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as AdminBlogArticle;
    }
  } catch (error) {
    console.error(`Error querying Firestore for slug "${slug}", checking static fallback:`, error);
  }

  // Fallback to static articles
  const staticArticle = getArticleBySlug(normalized);
  if (staticArticle) {
    return {
      ...staticArticle,
      id: `default-${staticArticle.id}`,
      status: "published",
    };
  }

  return null;
}

/**
 * Get related articles excluding the active slug
 */
export async function getRelatedArticles(currentSlug: string, count = 3): Promise<AdminBlogArticle[]> {
  const allBlogs = await getBlogs();
  const published = allBlogs.filter((b) => b.status !== "draft" && b.slug !== currentSlug);
  return published.slice(0, count);
}

/**
 * Delete a blog article and clean up any associated Firebase Storage images
 */
export async function deleteBlog(blog: AdminBlogArticle): Promise<void> {
  if (!blog.id) return;

  // 1. Delete Firestore document
  await deleteDoc(doc(db, "blogs", blog.id));

  // 2. Clean up storage files if stored in Firebase Storage
  const rawUrls = [blog.imageSrc, blog.bannerSrc].filter((u): u is string => Boolean(u));
  const urlsToDelete = rawUrls.filter(
    (url) => url.includes("firebasestorage.googleapis.com") || url.includes("xcell-ae678")
  );

  for (const fileUrl of urlsToDelete) {
    try {
      const pathStart = fileUrl.indexOf("/o/") + 3;
      const pathEnd = fileUrl.indexOf("?");
      if (pathStart > 2 && pathEnd > pathStart) {
        const filePath = decodeURIComponent(fileUrl.substring(pathStart, pathEnd));
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
      }
    } catch (storageErr) {
      console.warn("Could not delete blog file from storage:", storageErr);
    }
  }
}

/**
 * Restores all 4 default blogs into Firestore with fixed deterministic IDs
 * (default-1, default-2, default-3, default-4) so they are permanently restored.
 */
export async function restoreDefaultBlogs(): Promise<{ restored: number }> {
  let restored = 0;

  for (const article of BLOG_ARTICLES) {
    try {
      const docRef = doc(db, "blogs", `default-${article.id}`);
      await setDoc(docRef, {
        ...article,
        id: `default-${article.id}`,
        status: "published",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      restored++;
    } catch (err) {
      console.error(`Failed to restore default article "${article.slug}":`, err);
    }
  }

  return { restored };
}

/**
 * Seed initial hardcoded blogs from data/blogs.ts into Firestore.
 */
export async function seedInitialBlogs(): Promise<{ added: number; skipped: number }> {
  return restoreDefaultBlogs().then(({ restored }) => ({ added: restored, skipped: 0 }));
}
