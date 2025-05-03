"use client";
import LoginButton from "./LoginButton";
import styles from "./ClientHeader.module.css";

export default function ClientHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ITクイズアプリ</h1>
      <div className={styles.userInfo}>
        <LoginButton
          render={({ status, session, signIn, signOut }) => {
            if (status === "loading") return <p>ログイン確認中...</p>;
            if (session) {
              return (
                <>
                  <span>{session.user.name} さん</span>
                  <button className={styles.button} onClick={signOut}>
                    ログアウト
                  </button>
                </>
              );
            } else {
              return (
                <button
                  className={styles.button}
                  onClick={() => signIn("google")}
                >
                  Googleでログイン
                </button>
              );
            }
          }}
        />
      </div>
    </header>
  );
}
