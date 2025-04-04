"use client";

import React, { useState } from "react";
import { IoIosSave, IoIosImage } from "react-icons/io";

import TagInput from "@/components/common/TagInput";
import Button from "@/components/common/Button";
import { CreatePostData } from "@/types/blog.model";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const CreateEditPost: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("id");
  const isEditMode = !!postId;

  const [formData, setFormData] = useState<CreatePostData>({
    title: "",
    description: "",
    content: "",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: [],
  });

  // useEffect(() => {
  //   if (postData) {
  //     setFormData({
  //       title: postData.title || "",
  //       description: postData.description || "",
  //       content: postData.content || "",
  //       image: postData.image || "",
  //       tags: postData.tags || [],
  //     });
  //   }
  // }, [postData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageOptions = [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    ];

    const randomImage =
      imageOptions[Math.floor(Math.random() * imageOptions.length)];
    setFormData((prev) => ({ ...prev, image: randomImage }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditMode && postId) {
    } else {
    }
  };

  const isSubmitting = true;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/dashboard"
        className="text-blue-600 hover:text-blue-800 flex items-center"
      >
        <FaArrowLeft className="h-4 w-4 mr-2" />
        Back to List Posts
      </Link>
      <div>
        <h3>{isEditMode ? "Edit Post" : "Create New Post"}</h3>

        <div>
          {isLoading && isEditMode ? (
            <div className="flex flex-col space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2>Title</h2>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <h2>Description</h2>
                <input
                  id="description"
                  name="description"
                  placeholder="Brief description of your post"
                  value={formData.description}
                  onChange={handleChange}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <h3>Content</h3>
                <input
                  id="content"
                  name="content"
                  placeholder="Write your post content here..."
                  value={formData.content}
                  onChange={handleChange}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <h3>Tags</h3>
                <TagInput
                  tags={formData.tags}
                  setTags={(tags) => setFormData((prev) => ({ ...prev, tags }))}
                />
              </div>

              <div className="space-y-2">
                <h3>Featured Image</h3>
                <div className="flex flex-col space-y-4">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <Button
                    color="teal"
                    onClick={() => handleImageSelect({} as any)}
                    className="w-full py-8 border-dashed flex flex-col gap-2 items-center justify-center"
                  >
                    <IoIosImage className="h-6 w-6" />
                    <span>Click to select a different image</span>
                    <span className="text-xs text-gray-500">
                      (For demo purposes, this will select a random image)
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting}>
                  <IoIosSave className="mr-2 h-4 w-4" />
                  {isSubmitting
                    ? "Saving..."
                    : isEditMode
                    ? "Update Post"
                    : "Create Post"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEditPost;
