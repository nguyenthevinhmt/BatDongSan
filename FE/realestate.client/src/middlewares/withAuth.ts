import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      let cookie = request.cookies.get("access_token");
      console.log("cookie", cookie);
      let checkExistToken = cookie;
      console.log("chạy qua đây rồi", checkExistToken);
      if (checkExistToken !== undefined) {
        console.log("redict");
        NextResponse.redirect(new URL("/", request.url));
        // return next(request, _next);
      } else {
        console.log("else");
        return next(request, _next);
      }
    }
  };
};
