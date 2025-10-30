import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function parsePairs(env: string | undefined) {
  return (env || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean); // ["me:myPass","visitor:theirPass"]
}

export function middleware(req: Request) {
  // New: multiple acceptable pairs via BASIC_AUTH_PAIRS, fallback to single user/pass
  const pairs = parsePairs(process.env.BASIC_AUTH_PAIRS).length
    ? parsePairs(process.env.BASIC_AUTH_PAIRS)
    : [`${process.env.BASIC_AUTH_USER || ""}:${process.env.BASIC_AUTH_PASS || ""}`];

  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8"); // "user:pass"
    if (pairs.includes(decoded)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Gallery"' },
  });
}
