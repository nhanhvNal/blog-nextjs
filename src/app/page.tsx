import Link from "next/link";

import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";
import BlogCard from "@/components/common/BlogCard";

export default async function HomeContainer() {
  const { data } = await postService.index({ _limit: 3 });
  if (!data) return null;

  const posts = data as unknown as PostModel[];

  return (
    <div className="bg-gray-50 min-height-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Latest Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/post"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
