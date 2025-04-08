import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";
import Image from "next/image";
import Link from "next/link";

const authorAvatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";

const categories = [
  { name: "Technology", href: "/category/technology" },
  { name: "Lifestyle", href: "/category/lifestyle" },
  { name: "Business", href: "/category/business" },
];

async function getPopularPosts(): Promise<{ data: PostModel[] }> {
  try {
    return await postService.index({
      _limit: 2,
    });
  } catch {
    throw new Error("An unknown error occurred");
  }
}

const renderAuthorCard = () => (
  <div className="bg-white p-6 shadow-lg rounded-lg text-center">
    <Image
      width={96}
      height={96}
      src={authorAvatar}
      alt="Author"
      className="w-20 h-20 mx-auto rounded-full border-4 border-gray-300"
    />
    <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
    <p className="text-gray-500 text-sm mt-2">
      A writer and blogger passionate about sharing knowledge.
    </p>
    <Link href="/about" className="text-blue-500 mt-3 block">
      Read More
    </Link>
  </div>
);

const renderCategoryList = () => (
  <div className="bg-white p-6 shadow-lg rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
    <ul className="space-y-3 text-gray-600">
      {categories.map((category) => (
        <li key={category.href}>
          <Link href={category.href} className="hover:text-blue-500">
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const renderPopularPosts = ({
  popularPosts,
}: {
  popularPosts: PostModel[];
}) => (
  <div className="bg-white p-6 shadow-lg rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Posts</h3>
    <ul className="space-y-4">
      {popularPosts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="flex items-center space-x-3 hover:text-blue-500"
          >
            <Image
              width={64}
              height={64}
              src={post.image}
              alt={post.title}
              className="w-16 h-16 rounded-lg"
            />
            <span>{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default async function Sidebar() {
  const { data: popularPosts } = await getPopularPosts();

  return (
    <div className="space-y-8 mt-14">
      {renderAuthorCard()}
      {renderCategoryList()}
      {renderPopularPosts({ popularPosts })}
    </div>
  );
}
