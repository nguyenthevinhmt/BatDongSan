// import { message } from "antd";
// import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { environment } from "@/shared/environment/environment";
// import { LoginConfig, RefreshTokenConfig } from "@/shared/configs/authConfig";
// import { JWT } from "next-auth/jwt";

// async function refreshToken(token: JWT): Promise<JWT> {
//   const formData = new URLSearchParams();
//   formData.append("grant_type", RefreshTokenConfig.grant_type);
//   formData.append("client_id", RefreshTokenConfig.client_id);
//   formData.append("client_secret", RefreshTokenConfig.client_secret);
//   formData.append("refresh_token", token.refresh_token);
//   const res = await fetch(`${environment.authBaseUrl}`, {
//     method: "POST",
//     body: formData,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });
//   console.log("refreshed");

//   const response = await res.json();

//   return response.data;
// }

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider<any>({
//       type: "credentials",
//       credentials: {
//         username: { label: "username", type: "text" },
//         password: { label: "password", type: "text" },
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials as {
//           username: string;
//           password: string;
//         };
//         let credentialBody = {
//           grant_type: LoginConfig.grant_type,
//           username: username,
//           password: password,
//           scope: LoginConfig.scope,
//           client_id: LoginConfig.client_id,
//           client_secret: LoginConfig.client_secret,
//         };
//         const formData = new URLSearchParams();
//         formData.append("username", username);
//         formData.append("password", password);
//         formData.append("grant_type", LoginConfig.grant_type);
//         formData.append("scope", LoginConfig.scope);
//         formData.append("client_id", LoginConfig.client_id);
//         formData.append("client_secret", LoginConfig.client_secret);

//         const res = await fetch(`${environment.authBaseUrl}`, {
//           method: "POST",
//           body: formData,
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         });
//         if (res.ok) {
//           return await res.json();
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) return { ...token, ...user };

//       if (new Date().getTime() < Date.now() + token.expires_in * 60) return token;

//       return await refreshToken(token);
//     },

//     async session({ token, session }) {
//       session.user = token;
//       return session;
//     },
//   },
// };
// const handler = NextAuth(authOptions);
// export { handler as POST, handler as GET };