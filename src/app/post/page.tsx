import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { PostModel } from "@/types/blog.model";

export default async function PostsContainer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: "force-cache",
  });

  const data = await res.json();

  if (!data) return null;

  const posts = data as unknown as PostModel[];

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Blog | Danh sách bài viết</title>
        <meta
          name="description"
          content="Danh sách các bài viết thú vị trên blog."
        />
      </Head>
      <main className="flex-grow max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          Danh sách bài viết
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-400 mt-2">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
