// app/api/auth/[auth0]/route.js
import client from "@/utils/db/db";
import { getSession, handleAuth, handleCallback } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
//   {
//   callback: handleCallback((req) => {
//     return { redirectUri: "http://localhost:3000" };
//   }),
// }
