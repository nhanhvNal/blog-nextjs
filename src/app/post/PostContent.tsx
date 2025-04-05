import { PostModel } from "@/types/blog.model";

interface PostContentProps {
  post: PostModel;
}
function renderPostContent(content: string | null) {
  if (!content) {
    return (
      <p className="text-center text-gray-500 italic">No content available.</p>
    );
  }

  if (typeof content === "string") {
    return content.split("\n\n").map((paragraph, idx) => (
      <p key={idx} className="text-lg">
        {paragraph}
      </p>
    ));
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default function PostContent({ post }: Readonly<PostContentProps>) {
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-semibold text-red-500">Post not found</h1>
        <p className="text-gray-500 mt-2">
          The article you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg lg:prose-xl dark:prose-invert mx-auto">
      <header className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-50">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          {post.date && <time dateTime={post.date}>{post.date}</time>}
          {post.author && <span>• {post.author}</span>}
        </div>
      </header>

      {post.image && (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            {post.title || ""}
          </figcaption>
        </figure>
      )}

      <section className="mt-8 space-y-6 leading-relaxed text-gray-700 dark:text-gray-300">
        {renderPostContent(post.content)}
      </section>
    </article>
  );
}
