import { PostModel } from "@/types/blog.model";
import React from "react";

interface TableProps {
  posts: PostModel[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-blue-100">
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            ID
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Title
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Content
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Image
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr
            key={post.id}
            className="border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-4 text-sm text-gray-700">{post.id}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{post.title}</td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
              {post.content}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-md"
              />
            </td>
            <td className="px-6 py-4 text-sm space-x-2">
              <button
                onClick={() => onEdit(post.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-colors duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
