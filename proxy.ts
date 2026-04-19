import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host === "uncarved.prometheas.com" || host.startsWith("uncarved.prometheas.com:")) {
    const url = new URL(request.url);
    url.hostname = "prometheas.com";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
