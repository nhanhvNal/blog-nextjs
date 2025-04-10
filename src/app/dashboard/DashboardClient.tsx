"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BiPlusCircle } from "react-icons/bi";

import Table from "@/components/common/Table";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import LoadingPage from "@/components/common/LoadingPage";
import { getSession } from "next-auth/react";
import { PostModel } from "@/types/blog.model";

export const fetchPosts = async () => {
  const session = await getSession();
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: PostModel[] = await res.json();

    const userPosts = data.filter((post) => post.author === session.user.name);
    return userPosts;
  } catch {
    return [];
  }
};

const DashboardClient = ({ posts: initialPosts }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = useCallback(
    (id) => {
      const post = posts.find((post) => post.id === id);
      if (post) {
        setPostToDelete(post);
        setShowModal(true);
      }
    },
    [posts]
  );

  const confirmDelete = useCallback(async () => {
    if (!postToDelete) return;
    setIsLoading(true);
    try {
      await deletePost(postToDelete.id);
      setToast({ type: "success", message: "Post deleted successfully" });

      await refreshPosts();
      setCurrentPage(1);
    } catch {
      setToast({ type: "warning", message: "Failed to delete post" });
    } finally {
      closeModal();
    }
  }, [postToDelete]);

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("delete post failed");
      }

      return await res.json();
    } catch {
      return null;
    }
  };

  const refreshPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      setToast({ type: "error", message: "Error loading posts" });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsLoading(false);
  };

  const cancelDelete = () => setShowModal(false);

  const handleAdd = () => router.push("/dashboard/create-edit-post");
  const handleEdit = (id) =>
    router.push(`/dashboard/create-edit-post?id=${id}`);

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      {toast && <Alert type={toast.type} message={toast.message} />}
      <div className="p-6 bg-gray-50 min-height-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            List of Posts
          </h1>
          <Button
            className="flex items-center gap-1"
            onClick={handleAdd}
            label="Add New Post"
          >
            <BiPlusCircle className="text-xl" />
            Add New Post
          </Button>
        </div>
        <Table
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pageSize={5}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <Modal
          show={showModal}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Are you sure you want to delete this post: "${postToDelete?.title}"?`}
        />
      </div>
    </>
  );
};

export default DashboardClient;
