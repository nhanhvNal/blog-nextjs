import { PostModel } from "@/types/blog.model";

type FetchPostsOptions = {
  sort?: string;
  order?: "asc" | "desc";
  limit?: number;
  cache?: RequestCache; // eg: "no-store", "force-cache", etc.
  revalidate?: number;
};

export const fetchPosts = async ({
  sort = "",
  order = "desc",
  limit = 4,
  cache = "no-cache",
  revalidate,
}: FetchPostsOptions = {}) => {
  const query = new URLSearchParams({
    _sort: sort,
    _order: order,
    _limit: limit.toString(),
  });

  const fetchOptions: RequestInit = {
    method: "GET",
    cache,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (revalidate !== undefined) {
    fetchOptions.next = {
      revalidate,
    };
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?${query.toString()}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Error when getting blog posts");
  }

  const data: PostModel[] = await res.json();
  return data;
};
