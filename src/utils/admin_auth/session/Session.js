import { validateJWT } from "@/utils/admin_auth/JWTHelper/JWTHelper";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  console.log("Requesting session");
  const session = cookies().get("LISA_ADMIN");
  try {

    if (session === undefined) return null;

    const parsedSession = JSON.parse(session.value);

    if (
      parsedSession &&
      parsedSession.token &&
      parsedSession.token.trim() !== ""
    ) {
      const validJWT = validateJWT(parsedSession.token);
      if (!validJWT || !validJWT.valid || validJWT.valid === false) {
        return null;
      }
      return parsedSession;
    }

    return null;
  } catch (e) {
    console.error("Error during get session", e);
    return null;
  }
}
