"use client";

import React from "react";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Image
        src={src}
        width={800}
        height={400}
        alt={alt}
        className="w-full h-48 object-cover rounded-md shadow-md"
      />
    </div>
  );
};

export default ImagePreview;
