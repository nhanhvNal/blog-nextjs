import { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { PostModel } from "@/types/blog.model";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const fetchPosts = async () => {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: PostModel[] = await res.json();

    const userPosts = data.filter((post) => post.author === session.user.name);
    return userPosts;
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
  return <DashboardClient posts={posts} />;
}
