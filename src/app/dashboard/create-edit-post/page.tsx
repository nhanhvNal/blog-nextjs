"use client";

import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import LoadingPage from "@/components/common/LoadingPage";
import TagInput from "@/components/common/TagInput";
import FormInput from "@/components/CreateEditPost/FormInput";
import ImagePreview from "@/components/CreateEditPost/ImagePreview";
import { useForm } from "@/hook/useForm";
import { usePost } from "@/hook/usePost";
import { postService } from "@/services/api";
import { POST_INITIAL } from "@/shared/constants";
import { CreatePostData } from "@/types/blog.model";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const CreateEditPost: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryParams = useSearchParams();
  const postId = queryParams.get("id");
  const isEditMode = !!postId;
  const { post, alert, setAlert, setIsLoading, isLoading } = usePost(postId);
  const { formData, handleChange, setTags, setFormData } = useForm(
    POST_INITIAL(session)
  );

  useEffect(() => {
    if (post) {
      setTags(post.tags || []);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      setFormData((prevFormData) => {
        const isChanged =
          prevFormData.title !== post.title ||
          prevFormData.description !== post.description ||
          prevFormData.content !== post.content ||
          prevFormData.image !== post.image ||
          JSON.stringify(prevFormData.tags) !== JSON.stringify(post.tags);

        if (isChanged) {
          return {
            ...prevFormData,
            title: post.title || "",
            description: post.description || "",
            content: post.content || "",
            image: post.image || "",
            tags: post.tags || [],
          };
        }
        return prevFormData;
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode && postId) {
        await updatePost(postId, formData);
      } else {
        await createPost(formData);
      }

      setAlert({
        type: "success",
        message: isEditMode
          ? "Post updated successfully"
          : "New post created successfully",
      });

      setTimeout(() => setAlert(null), 3000);
    } catch {
      setAlert({
        type: "error",
        message: "Error saving post.",
      });
    } finally {
      finalizeSubmission();
    }
  };

  const createPost = async (data: CreatePostData) => {
    try {
      await postService.create(data);
    } catch {
      throw new Error("Error creating post.");
    }
  };

  const updatePost = async (id: string, data: CreatePostData) => {
    try {
      await postService.update(id, data);
    } catch {
      throw new Error("Error updating post.");
    }
  };

  const finalizeSubmission = () => {
    setTimeout(() => {
      router.push("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <LoadingPage isLoading={isLoading} />
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-xl">
        <h3 className="text-3xl font-bold mb-6 text-center text-cyan-600">
          {isEditMode ? "Edit post" : "Create post"}
        </h3>
        <Link
          href="/dashboard"
          className="text-cyan-600 hover:text-cyan-800 flex items-center mb-6"
        >
          <FaArrowLeft className="h-5 w-5 mr-2" />
          Back to list posts
        </Link>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormInput
            id="title"
            name="title"
            value={formData.title}
            placeholder="Enter title post"
            onChange={handleChange}
            required
          />
          <FormInput
            id="description"
            name="description"
            value={formData.description}
            placeholder="Enter description post"
            onChange={handleChange}
            required
          />
          <FormInput
            id="content"
            name="content"
            value={formData.content}
            placeholder="Enter content post "
            onChange={handleChange}
            required
          />
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Tags</h3>
            <TagInput tags={formData.tags} setTags={setTags} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Image</h3>
            <ImagePreview src={formData.image} alt="Featured Image" />
          </div>
          <div className="flex justify-end">
            <Button color="cyan" type="submit" disabled={isLoading}>
              {isEditMode ? "Update post" : "Create post"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const SuspendedCreateEditPost = () => (
  <Suspense fallback={<LoadingPage isLoading={true} />}>
    <CreateEditPost />
  </Suspense>
);

export default SuspendedCreateEditPost;
