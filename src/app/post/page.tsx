import PostList from "./PostList";

const fetchPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "no-store",
      next: {
        revalidate: 5,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch {
    return [];
  }
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
