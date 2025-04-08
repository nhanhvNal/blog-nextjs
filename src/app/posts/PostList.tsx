"use client";

import { PostModel } from "@/types/blog.model";
import BlogCard from "@/components/common/BlogCard";
import LoadingPage from "@/components/common/LoadingPage";

type PostListProps = {
  posts: PostModel[];
};

const PostList = ({ posts }: PostListProps) => {
  if (!posts) {
    return <LoadingPage isLoading={true} />;
  }

  return (
    <div className="flex flex-col min-height-screen">
      <main className="flex-grow max-w-9xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-bold text-center mb-6">List of Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PostList;
