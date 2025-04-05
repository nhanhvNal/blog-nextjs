"use client";

import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";

import Table from "@/app/dashboard/Table";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import LoadingPage from "@/components/common/LoadingPage";
import Modal from "@/components/common/Modal";

export const fetchPosts = async () => {
  try {
    const response = await postService.index();
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const Dashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostModel | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchPosts();
        setPosts(data as unknown as PostModel[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setToast({
            type: "error",
            message: err.message,
          });
        }
        throw new Error("An error occurred while retrieving posts data.");
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      const post = posts.find((post) => post.id === id);
      if (!post) return;
      setPostToDelete(post);
      setShowModal(true);
    },
    [posts]
  );

  const confirmDelete = useCallback(async () => {
    if (!postToDelete) return;

    setIsLoading(true);

    try {
      await deletePost(postToDelete.id);

      setToast({ type: "success", message: "Deleted post successfully" });

      await refreshPosts();
    } catch (err) {
      setToast({
        type: "warning",
        message: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      closeModal();
    }
  }, [postToDelete]);

  const deletePost = async (id: string) => {
    await postService.destroy(id);
  };

  const refreshPosts = async () => {
    const { data } = await fetchPosts();
    setPosts(data as unknown as PostModel[]);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsLoading(false);
  };

  const cancelDelete = () => setShowModal(false);

  const handleAdd = () => router.push("/dashboard/create-edit-post");

  const handleEdit = (id: string) =>
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
            color="green"
            label="Add New Post"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
            onClick={handleAdd}
          >
            <BiPlusCircle className="text-xl" />
            Add New Post
          </Button>
        </div>
        <Table posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
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

export default Dashboard;
