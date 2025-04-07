import { Metadata } from "next";
import Dashboard from "./Dashboard";

const fetchPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: {
        revalidate: 1,
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

export default async function DashboardSSG() {
  const posts = await fetchPosts();
  return <Dashboard posts={posts} />;
}
