"use client";

import { useState } from "react";
import { CreatePostData } from "@/types/blog.model";

export const useForm = (initialData: CreatePostData) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setTags = (tags: string[]) =>
    setFormData((prev) => ({ ...prev, tags }));

  return { formData, handleChange, setTags, setFormData };
};
