import { postService } from "@/services/api";
import { PostModel } from "@/types/blog.model";
import Image from "next/image";

async function getBlogDetail(id: string): Promise<PostModel> {
  const { data: postDetail } = await postService.show(id);

  if (!postDetail) return null;

  return postDetail as unknown as PostModel;
}

export default async function PostDetailPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const post = await getBlogDetail(params.id);

  if (!post) {
    return <h1 className="text-center text-red-500">Bài viết không tồn tại</h1>;
  }

  return (
    <div className="flex-grow max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
      <p className="text-gray-500 mt-2">{post.date}</p>

      <div className="mt-6 justify-center flex">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>

      <p className="mt-6 text-lg text-gray-700">{post.content}</p>
    </div>
  );
}
