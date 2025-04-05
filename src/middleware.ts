import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;

  if (token) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  const session = await getSession();

  if (!session && !!authHeader) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (authHeader?.startsWith("Basic ")) {
    try {
      const base64Credentials = authHeader.split(" ")[1];
      const credentials = atob(base64Credentials).split(":");
      const [username, password] = credentials;

      if (
        username === process.env.BASIC_AUTH_USER &&
        password === process.env.BASIC_AUTH_PASS
      ) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Invalid Authorization header format");
    }
  }

  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/dashboard"],
  missing: [{ source: "/api/auth/:path*" }],
};
