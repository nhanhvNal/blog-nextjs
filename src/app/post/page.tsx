import Head from "next/head";
import { PostModel } from "@/types/blog.model";
import BlogCard from "@/components/common/BlogCard";

export default async function PostsContainer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  });

  const data = await res.json();
  if (!data) return null;

  const posts = data as unknown as PostModel[];

  return (
    <div className="flex flex-col min-height-screen">
      <Head>
        <title>List of Posts</title>
        <meta name="description" content="List of Posts." />
      </Head>
      <main className="flex-grow max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-bold text-center mb-6">List of Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
