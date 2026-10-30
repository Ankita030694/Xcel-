import React from "react";
import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import { BLOG_ARTICLES } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Laundry Engineering & Industry Insights | XCEL",
  description:
    "Expert technical insights, energy-saving benchmarks, and equipment selection guides for industrial and commercial laundry facilities across India.",
};

export default function BlogsPage() {
  return <BlogsClient initialArticles={BLOG_ARTICLES} />;
}
