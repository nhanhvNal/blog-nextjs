import Link from "next/link";
import Image from "next/image";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";

export default async function HomeContainer() {
  const { data } = await postService.index({ _limit: 3 });
  if (!data) return null;

  const posts = data as unknown as PostModel[];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to My Personal Blog
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Sharing ideas, stories, and experiences about blogging, content
            creation, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="relative mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black opacity-50 w-full h-24 rounded-lg"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <Link
                  className="text-blue-500 hover:underline mt-4 inline-block"
                  href={`/post/${post.id}`}
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
