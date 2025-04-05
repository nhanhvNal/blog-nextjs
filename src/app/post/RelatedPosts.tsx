import Link from "next/link";
import { PostModel } from "@/types/blog.model";

interface RelatedPostsProps {
  posts: PostModel[];
}

export default function RelatedPosts({ posts }: Readonly<RelatedPostsProps>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <Link href={`/post/${post.id}`} className="block">
            {post.image && (
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {post.date}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
