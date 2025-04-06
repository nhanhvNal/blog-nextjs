import { PostModel } from "@/types/blog.model";
import BlogCard from "../common/BlogCard";

interface FeaturedPostsProps {
  featuredPosts: PostModel[];
}

const FeaturedPosts = ({ featuredPosts = [] }: FeaturedPostsProps) => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts?.length > 0 &&
            featuredPosts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
