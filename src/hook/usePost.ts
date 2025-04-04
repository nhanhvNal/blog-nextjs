"use client";

import { useState, useEffect } from "react";
import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";

const fetchPost = async (id: string) => {
  try {
    const response = await postService.show(id);
    return response.data as unknown as PostModel;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Error when get post."
    );
  }
};

export const usePost = (postId: string | null) => {
  const [post, setPost] = useState<PostModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!postId) return;

    const getPost = async () => {
      setIsLoading(true);
      try {
        const postData = await fetchPost(postId);
        setPost(postData);
      } catch (err) {
        setAlert({ type: "error", message: "Can't get list posts" });
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, [postId]);

  return { post, isLoading, alert, setAlert,setIsLoading };
};
