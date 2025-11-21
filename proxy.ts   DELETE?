// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function parsePairs(env: string | undefined) {
  return (env || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean); // e.g., ["you:pass", "visitor:pass"]
}

export function proxy(req: NextRequest) {
  const pairs =
    parsePairs(process.env.BASIC_AUTH_PAIRS).length
      ? parsePairs(process.env.BASIC_AUTH_PAIRS)
      : [
          `${process.env.BASIC_AUTH_USER || ""}:${
            process.env.BASIC_AUTH_PASS || ""
          }`,
        ];

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