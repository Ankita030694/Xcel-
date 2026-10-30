import React from "react";
import type { Metadata } from "next";
import { BLOG_ARTICLES, getArticleBySlug, getRelatedArticles } from "@/data/blogs";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  BLOG_ARTICLES.forEach((article) => {
    params.push({ slug: article.slug });
    if (article.aliases) {
      article.aliases.forEach((alias) => {
        params.push({ slug: alias });
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Industry Insights | XCEL Technical Journal",
    };
  }

  const keywordsList: string[] = [
    article.focusKeyword || article.category,
    ...(article.secondaryKeywords || []),
  ].filter((k): k is string => Boolean(k));

  return {
    title: `${article.title} | XCEL`,
    description: article.metaDescription || article.lead,
    keywords: keywordsList,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.lead,
      images: [
        {
          url: article.bannerSrc || article.imageSrc,
          width: 1600,
          height: 600,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug) || null;
  const relatedArticles = article ? getRelatedArticles(article.slug, 3) : [];

  return (
    <BlogDetailClient
      slug={slug}
      initialArticle={article}
      initialRelated={relatedArticles}
    />
  );
}
