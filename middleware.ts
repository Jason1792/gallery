// middleware.ts (Next.js App or Pages Router)
import { NextResponse } from "next/server";

export const config = {
  // Protect everything except Next internals and static assets; adjust as needed
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const validUser = process.env.BASIC_AUTH_USER || "";
  const validPass = process.env.BASIC_AUTH_PASS || "";

  // Build the expected header value: "Basic base64(user:pass)"
  const expected = "Basic " + Buffer.from(`${validUser}:${validPass}`).toString("base64");

  if (authHeader === expected) return NextResponse.next();

  // No / wrong creds: send a Basic-Auth challenge
  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Gallery"' },
  });
}
