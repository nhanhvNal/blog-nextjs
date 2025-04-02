// pages/blog/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";

export default function BlogList({
  posts,
}: Readonly<{ posts: { id: string; title: string }[] }>) {
  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://your-api.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 10, // Cập nhật dữ liệu mới sau 10s
  };
};
