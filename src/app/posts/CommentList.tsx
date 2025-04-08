interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: Readonly<CommentListProps>) {
  return (
    <section className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      <div className="space-y-6">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              <p className="text-sm text-gray-500">
                {comment.name} – {formatTimeAgo(comment.createdAt)}
              </p>
              <p className="mt-2 text-gray-800">{comment.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </section>
  );
}

function formatTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 60000); // in minutes

  if (diff < 1) return "just now";
  if (diff < 60) return `${diff} minute(s) ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours} hour(s) ago`;
  const days = Math.floor(hours / 24);
  return `${days} day(s) ago`;
}
