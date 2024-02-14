import { CookieService } from "@/shared/services/cookies.service";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const checkExistToken = CookieService.getAccessToken();
  if (checkExistToken !== null) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
