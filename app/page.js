// app/page.js
import Link from "next/link";
import styles from "./HomePage.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
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
