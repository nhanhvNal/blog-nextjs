"use client";

import { PostModel } from "@/types/blog.model";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Image from "next/image";
import Pagination from "@/components/common/Pagination";

interface TableProps {
  posts: PostModel[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  pageSize?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  posts,
  onEdit,
  onDelete,
  onPageChange,
  pageSize = 5,
  currentPage,
}) => {
  const totalPages = Math.ceil(posts.length / pageSize);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[400px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">STT</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Content</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post, index) => (
            <tr
              key={post.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-4 py-4">
                {(currentPage - 1) * pageSize + index + 1}
              </td>
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4 max-w-xs truncate">{post.content}</td>
              <td className="px-6 py-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={200}
                  height={200}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="p-4 flex space-x-4">
                <button
                  onClick={() => onEdit(post.id)}
                  className="text-blue-500 hover:text-blue-700 transition flex items-center space-x-1"
                >
                  <BiEdit className="text-xl" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-500 hover:text-red-700 transition flex items-center space-x-1"
                >
                  <BiTrash className="text-xl" />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
