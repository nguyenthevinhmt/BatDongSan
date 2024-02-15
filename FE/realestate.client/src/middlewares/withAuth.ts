import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./type";
import { CookieService } from "@/shared/services/cookies.service";

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        if(request.nextUrl.pathname.startsWith('/auth')){
            const checkExistToken = CookieService.getAccessToken();
            console.log('chạy qua đây rồi', checkExistToken)
            if (checkExistToken) {
                console.log("123123123");
                return NextResponse.redirect(new URL("/", request.url));
            } 
            else{
                console.log("else auth");
                return next(request, _next);
            }
        }
    };
};

  