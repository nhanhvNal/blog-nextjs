"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/app/dashboard/Table";
import { PostModel } from "@/types/blog.model";
import Modal from "@/components/common/Modal";
import LoadingPage from "@/components/common/LoadingPage";
import { postService } from "@/services/api";

const Dashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostModel[]>([
    {
      id: "1",
      title: "Làm quen với Next.js",
      description:
        "Hướng dẫn làm quen với Next.js, framework phát triển web hiện đại.",
      content:
        "Next.js là một framework phát triển ứng dụng React với nhiều tính năng mạnh mẽ như SSR, SSG, API Routes và khả năng tối ưu hóa hiệu suất.",
      image: "https://i.postimg.cc/nVqn54KQ/1.jpg",
      date: "2025-04-03",
    },
    {
      id: "2",
      title: "Tối ưu SEO cho Website",
      description: "Các bước tối ưu hóa SEO để cải thiện thứ hạng trên Google.",
      content:
        "SEO là một yếu tố quan trọng trong việc đưa website lên top của công cụ tìm kiếm. Cải thiện SEO giúp bạn có nhiều lưu lượng truy cập tự nhiên hơn.",
      image: "https://i.postimg.cc/BnXkWsWw/2.png",
      date: "2025-04-02",
    },
    {
      id: "3",
      title: "Kết nối API với Next.js",
      description: "Hướng dẫn kết nối API trong Next.js và cách xử lý dữ liệu.",
      content:
        "Next.js cho phép bạn dễ dàng tích hợp API vào ứng dụng của mình, hỗ trợ cả SSR và SSG để mang lại hiệu suất tối ưu.",
      image: "https://i.postimg.cc/kX5h895X/3.jpg",
      date: "2025-03-30",
    },
    {
      id: "4",
      title: "Phát triển Web bằng TypeScript",
      description: "Lợi ích của TypeScript trong việc phát triển ứng dụng web.",
      content:
        "TypeScript giúp đảm bảo tính ổn định và giảm thiểu lỗi trong mã nguồn của bạn. Nó cung cấp khả năng kiểm tra kiểu dữ liệu và hoàn thiện mã nguồn tốt hơn.",
      image: "https://i.postimg.cc/W4cn9PsZ/4.png",
      date: "2025-03-28",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostModel | null>(null);

  const handleDelete = (id: string) => {
    const post = posts.find((post) => post.id === id);
    setPostToDelete(post || null);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      deletePost(postToDelete?.id || "");
      setShowModal(false);
    }, 1000);
  };

  const deletePost = async (id: string) => {
    await postService.destroy(id);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleAdd = () => {
    router.push("/dashboard/create-edit-post");
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/create-edit-post?id=${id}`);
  };

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <button
          onClick={handleAdd}
          className="mb-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Add New Post
        </button>
        <Table posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        <Modal
          show={showModal}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Are you sure you want to delete the post: "${postToDelete?.title}"?`}
        />
      </div>
    </>
  );
};

export default Dashboard;
