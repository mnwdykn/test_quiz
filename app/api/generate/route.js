// /app/api/generate/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // 追加
import { authOptions } from "../auth/[...nextauth]/route"; // 追加
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEYが設定されていません。");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req) {
  // 🌟 セッション確認追加！
  const session = await getServerSession(authOptions);

  if (!session) {
    // ログインしていない場合はエラー返す
    return NextResponse.json(
      { error: "ログインが必要です。" },
      { status: 401 }
    );
  }

  try {
    const { prompt } = await req.json();
    console.log("[リクエスト受信] prompt:", prompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("[Gemini応答] text:", text);

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("[サーバーエラー]", error);

    return NextResponse.json(
      { answer: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
