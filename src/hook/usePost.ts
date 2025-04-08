"use client";

import { useState, useEffect } from "react";
import { PostModel } from "@/types/blog.model";
import { API_AUTH_URL } from "@/shared/constants";
const apiUrl = API_AUTH_URL ?? "http://localhost:3000";

const fetchPost = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`);

    if (!res.ok) throw new Error("Error when getting blog posts");

    return res.json();
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
      } catch {
        setAlert({ type: "error", message: "Can't get list posts" });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    getPost();
  }, [postId]);

  return { post, isLoading, alert, setAlert, setIsLoading };
};
