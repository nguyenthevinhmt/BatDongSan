import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";

export const protectedRouteMiddleware: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // if (request.nextUrl.pathname.startsWith("/dashboard")) {
    //   const checkExistToken = CookieService.getAccessToken();
    //   console.log("chạy qua protected route rồi", checkExistToken);
    //   if (checkExistToken !== undefined) {
    //     console.log("111");
    //     return next(request, _next);
    //     //return NextResponse.redirect(new URL("/auth/login", request.url));
    //   } else {
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    //   }
    // }
    const pathname = request.nextUrl.pathname;
    let url = request.url;
    console.log(url);
    const privateRoute = ["/dashboard"];
    if (url.includes("/dashboard")) {
      console.log("throw private route");
    } else {
      console.log("lọt vào else rồi");
      return next(request, _next);
    }
  };
};
// export const config = {
//   matcher: ["/dashboard"],
// };
