// /app/api/admin-users/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // Supabase 管理者クライアント

export async function GET() {
  const session = await getServerSession(authOptions);

  // 認証チェック
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "未認証" }, { status: 401 });
  }

  // 管理者チェック（環境変数から取得し、カンマ区切り対応）
  const allowedAdmins = process.env.ADMIN_EMAILS?.split(",").map((e) =>
    e.trim()
  );
  const isAdmin = allowedAdmins?.includes(session.user.email);

  if (!isAdmin) {
    return NextResponse.json(
      { error: "アクセス権がありません" },
      { status: 403 }
    );
  }

  try {
    // Supabase からユーザー一覧取得
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabaseエラー:", error);
      return NextResponse.json(
        { error: "データ取得に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ users: data });
  } catch (err) {
    console.error("[サーバーエラー]", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
