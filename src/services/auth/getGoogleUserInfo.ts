import axios from "axios";

export function getOAuth2(url: string): string {
  const oauthURL = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  const oauthParams: { [key: string]: string } = {
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    response_type: "token",
    prompt: "select_account",
    state: "loading",
    redirect_uri: `${url}/auth/register?`,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  };

  Object.keys(oauthParams).forEach((key) =>
    oauthURL.searchParams.append(key, oauthParams[key]),
  );

  return oauthURL.href;
}

export async function getGoogleUserInfo(token: string): Promise<any> {
  return axios
    .get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}
