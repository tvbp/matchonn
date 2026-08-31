import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "matchonn_admin";

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`matchonn-admin-salt:${password}`).digest("hex");
}

export function tokenForPassword(password: string): string | null {
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return null;
  return expectedToken();
}

export function isValidAdminToken(token: string | undefined): boolean {
  const expected = expectedToken();
  return Boolean(token && expected && token === expected);
}
