import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, tokenForPassword } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password?: string };
  const token = password ? tokenForPassword(password) : null;

  if (!token) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
