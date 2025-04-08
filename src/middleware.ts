import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const authHeader = req.headers.get("authorization");

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (token) {
      return NextResponse.next();
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
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
    } catch {}
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!api/).*)"],
};
