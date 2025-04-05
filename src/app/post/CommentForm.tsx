"use client";

import { useState } from "react";

interface CommentFormProps {
  onSubmit?: (comment: string) => void;
}

export default function CommentForm({ onSubmit }: Readonly<CommentFormProps>) {
  const [comment, setComment] = useState("");

  return (
    <section className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Leave a Comment</h2>
      <form className="space-y-4">
        <textarea
          className="w-full border border-gray-300 p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Comment
        </button>
      </form>
    </section>
  );
}
