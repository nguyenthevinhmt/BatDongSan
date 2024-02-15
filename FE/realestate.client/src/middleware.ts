'use client'
import { stackMiddlewares } from "./middlewares/stackMiddlewares";
import { withAuth } from "./middlewares/withAuth";
import { protectedRouteMiddleware } from "./middlewares/protectedRoute";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // const checkExistToken = CookieService.getAccessToken();
//   // if (checkExistToken !== null) {
//   //   return NextResponse.redirect(new URL("/", request.url));
//   // } else {
//   //   return NextResponse.redirect(new URL("/auth/login", request.url));
//   // }
//   // return NextResponse.next();
// }

// // // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/auth/login", "/auth/register"],
// };

const middleware = stackMiddlewares([withAuth, protectedRouteMiddleware]);

export default middleware;