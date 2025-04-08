import PostList from "./PostList";

const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  }); 
  

  if (!res.ok) throw new Error("Error when getting blog posts");
  return res.json();
};

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
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}
