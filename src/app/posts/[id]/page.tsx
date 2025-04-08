import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { PostModel } from "@/types/blog.model";
import PostContent from "../PostContent";
import RelatedPosts from "../RelatedPosts";
import Seo from "@/components/Seo";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";
import { CommentModel } from "@/types/comment.model";
import { fetchPosts } from "@/shared/untils/api";

export async function generateMetadata({ params }, parent: ResolvingMetadata) {
  const { id } = await params;
  try {
    const [post, comments] = await Promise.all([
      fetchPostDetail(id),
      getComments(),
    ]);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested article could not be found.",
      };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return [
      {
        title: post.title,
        description: post.description || post.content.substring(0, 155),
        openGraph: {
          title: post.title,
          description: post.description || post.content.substring(0, 155),
          type: "article",
          publishedTime: post.date,
          images: post.image ? [post.image, ...previousImages] : previousImages,
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.description || post.content.substring(0, 155),
          images: post.image ? [post.image] : [],
        },
      },
      comments,
    ];
  } catch {
    return {
      title: "Blog Post",
      description: "Read our latest article",
    };
  }
}

const fetchPostDetail = async (id: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) {
    throw new Error("Can't get blog detail");
  }

  return res.json();
};

async function getComments(): Promise<CommentModel[] | null> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comment`);

  if (!res.ok) {
    throw new Error("Can't get blog comments");
  }

  return res.json();
}

async function getRelatedPosts(excludeId: string): Promise<PostModel[]> {
  try {
    const data = await fetchPosts({
      limit: 3,
      revalidate: 2,
      cache: "force-cache",
    });

    if (!data) return [];

    const posts: PostModel[] = data as unknown as PostModel[];
    return posts.filter((post) => post.id !== excludeId);
  } catch {
    return [];
  }
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const [post, comments, relatedPosts] = await Promise.all([
    fetchPostDetail(id),
    getComments(),
    getRelatedPosts(id),
  ]);

  if (!post) notFound();
  return (
    <>
      <Seo
        title={post.title}
        description={post.description || post.content?.substring(0, 155)}
        image={post.image}
        url={`http://localhost:3000/posts/${post.id}`}
      />
      <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-9xl mx-auto">
          <PostContent post={post} />
        </article>

        <CommentForm />
        <CommentList comments={comments} />

        {relatedPosts.length > 0 && (
          <section className="max-w-9xl mx-auto mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Posts
            </h2>
            <RelatedPosts posts={relatedPosts} />
          </section>
        )}
      </main>
    </>
  );
}
