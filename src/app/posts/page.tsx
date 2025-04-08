import { fetchPosts } from "@/shared/untils/api";
import PostList from "./PostList";

import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Danh sách bài viết | My Blog",
    description: "Khám phá các bài viết mới nhất từ chúng tôi.",
    openGraph: {
      title: "Danh sách bài viết | My Blog",
      description: "Khám phá các bài viết mới nhất từ chúng tôi.",
      url: `${process.env.NEXTAUTH_URL}/post`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Danh sách bài viết | My Blog",
      description: "Khám phá các bài viết mới nhất từ chúng tôi.",
    },
    alternates: {
      canonical: "/post",
    },
  };
};

export default async function Page() {
  const posts = await fetchPosts({
    limit: 100,
    cache: "force-cache",
    revalidate: 10,
  });
  return <PostList posts={posts} />;
}
