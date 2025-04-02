import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware");
  
  const token = req.cookies.get("next-auth.session-token")?.value;

  if (token) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = atob(base64Credentials).split(":");
    const [username, password] = credentials;

    if (
      username === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASS
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
