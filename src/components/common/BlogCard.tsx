import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaClock, FaTag } from "react-icons/fa";

import { PostModel } from "@/types/blog.model";

interface BlogCardProps {
  post: PostModel;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <div className="w-full h-56 bg-gray-200 rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-56 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black opacity-50 w-full h-24 rounded-lg"></div>
      </div>

      <div className="flex-grow mb-6">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={post.id + index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
              >
                <FaTag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {post.title}
        </h2>

        <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
          {post.authorAvatar && (
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full overflow-hidden mr-1">
                <Image
                  width={100}
                  height={100}
                  src={post.authorAvatar}
                  alt={post.author}
                  className="h-full w-full object-cover"
                />
              </div>
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center">
            <FaClock className="h-4 w-4 mr-1" />
            <span>{post.readingTime || "5 min"}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">Published on {post.date}</p>
        <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
      </div>

      <div className="mt-auto flex justify-end">
        <Link
          href={`/posts/${post.id}`}
          className="inline-flex items-center   py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors"
        >
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Read more
              <FaArrowRight className="ml-2 h-4 w-4" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
