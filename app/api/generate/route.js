// /app/api/generate/route.js

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// APIキーの取得
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// APIキーが未設定なら即エラー
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEYが設定されていません。");
}

// Google Generative AIクライアントの初期化
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// POSTリクエスト処理
export async function POST(req) {
  try {
    // リクエストボディからpromptを取得
    const { prompt } = await req.json();
    console.log("[リクエスト受信] prompt:", prompt);

    // モデルの取得（必要に応じてモデル名を変更可能）
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // コンテンツ生成
    const result = await model.generateContent(prompt);

    // 応答テキストの取得
    const text = result.response.text();
    console.log("[Gemini応答] text:", text);

    // クライアントへJSONで返す
    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("[サーバーエラー]", error);

    // 例外発生時はステータス500でエラーメッセージを返す
    return NextResponse.json(
      { answer: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
