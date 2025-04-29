// components/LoginButton.jsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className={styles.message}>ログイン状態を確認中...</p>;
  }

  if (session) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>ようこそ、{session.user.name}さん！</p>
        <button className={styles.button} onClick={() => signOut()}>
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => signIn("google")}>
        Googleでログイン
      </button>
    </div>
  );
}
