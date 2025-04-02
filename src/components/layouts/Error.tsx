import React from "react";
import Link from "next/link";

import { ErrorCode } from "@/shared/constants";

type ErrorProps = {
  statusCode: ErrorCode;
  content: string;
};

const ErrorLayout = (props: ErrorProps) => {
  const { statusCode, content } = props;

  return (
    <div className="flex items-center justify-center h-100">
      <div className="text-center">
        <h1 data-testid="status_code" className="display-1 fw-bold">
          {statusCode}
        </h1>
        <p data-testid="content_error" className="fs-3">
          {content}
        </p>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
};

export default ErrorLayout;
