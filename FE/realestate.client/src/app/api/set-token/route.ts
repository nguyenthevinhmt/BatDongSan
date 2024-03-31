export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token as string;
  if (!token) {
    return Response.json(
      { message: "Không nhận được access token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
