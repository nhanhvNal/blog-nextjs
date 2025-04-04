"use client";

import React, { useState, KeyboardEvent } from "react";
import { RiCloseLine } from "react-icons/ri";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-wrap gap-2 border p-2 rounded-md min-h-[60px]">
        {tags.map((tag, index) => (
          <div
            key={index + tag}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
          >
            <span className="mr-1">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-800 hover:text-blue-600"
            >
              <RiCloseLine className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder="Add tags (press enter or comma)"
          className="flex-grow outline-none bg-transparent p-1 min-w-[120px]"
        />
      </div>
      <p className="text-xs text-gray-500">Press enter or comma to add a tag</p>
    </div>
  );
};

export default TagInput;
