"use client";

import React from "react";

import ErrorLayout from "@/components/layouts/Error";
import { ErrorCode } from "@/shared/constants";

const Page404 = () => {
  return (
    <ErrorLayout
      statusCode={ErrorCode.NOT_FOUND}
      content="Page not found"
    />
  );
};

export default Page404;
