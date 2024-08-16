import { SessionOptions } from "iron-session";

export interface VisitorSession {
  hasVisited: boolean;
}

export const sessionOptions: SessionOptions<VisitorSession> = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "visitor-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};
