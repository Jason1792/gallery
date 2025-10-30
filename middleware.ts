import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const u = process.env.BASIC_AUTH_USER || "";
  const p = process.env.BASIC_AUTH_PASS || "";
  const expected = "Basic " + Buffer.from(`${u}:${p}`).toString("base64");

  if (auth === expected) return NextResponse.next();

  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Gallery"' },
  });
}
