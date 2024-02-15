import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";
import { CookieService } from "@/shared/services/cookies.service";

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
    const privateRoute = ["/dashboard"]
    console.log("chạy chưa", privateRoute.some((path) => {pathname.startsWith(path)}))
    if(privateRoute.some((path) => {pathname.startsWith(path)})){
        console.log("throw private route")
    }
    else{
        return next(request, _next);
    }
  };
};
// export const config = {
//   matcher: ["/dashboard"],
// };
