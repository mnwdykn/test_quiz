import Link from "next/link";
import styles from "./HomePage.module.css";
import LoginButton from "../components/LoginButton"; // 追加！！！

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* ログインボタンエリア */}
      <LoginButton />

      {/* メインタイトル */}
      <h1 className={styles.homeTitle}>ITクイズアプリへようこそ！</h1>

      {/* サブタイトル */}
      <p className={styles.homeSubtitle}>あなたのIT知識を試してみましょう！</p>

      {/* クイズ開始ボタン */}
      <Link href="/quiz">
        <button className={styles.startButton}>クイズを開始する</button>
      </Link>
    </div>
  );
}
