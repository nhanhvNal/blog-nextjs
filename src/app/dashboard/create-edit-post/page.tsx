"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Post {
  title: string;
  content: string;
  imageUrl: string;
}

const CreateEditPost = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const id = queryParams.get("id");
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);

  // Nếu có id trong URL, thực hiện fetch dữ liệu bài viết từ API để chỉnh sửa
  useEffect(() => {
    if (id) {
      // Giả sử bạn có API để lấy bài viết từ id
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false); // Nếu không có id, nghĩa là đang tạo bài viết mới
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title || !post.content) return;

    const method = id ? "PUT" : "POST"; // PUT nếu chỉnh sửa, POST nếu tạo mới
    const url = id ? `/api/posts/${id}` : `/api/posts`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      router.push("/dashboard"); // Chuyển hướng về Dashboard sau khi lưu
    } else {
      console.error("Failed to save post");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        {id ? "Edit Post" : "Create Post"}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <div>
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {id ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateEditPost;
