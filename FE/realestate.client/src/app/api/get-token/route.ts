import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const result = token?.value;
  return Response.json({ token }, { status: 200 });
}
