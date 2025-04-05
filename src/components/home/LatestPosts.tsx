// components/home/LatestPosts.tsx
import Link from "next/link";
import { PostModel } from "@/types/blog.model";
import BlogCard from "../common/BlogCard";

interface LatestPostsProps {
  posts: PostModel[];
}

const LatestPosts = ({ posts }: LatestPostsProps) => {
  return (
    <section id="latest-posts">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
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
    </section>
  );
};

export default LatestPosts;
