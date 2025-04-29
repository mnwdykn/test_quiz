// /components/LoginButton.jsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>読み込み中...</p>;
  }

  if (session) {
    return (
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p>ようこそ、{session.user.name}さん！</p>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button onClick={() => signIn("google")}>Googleでログイン</button>
    </div>
  );
}
