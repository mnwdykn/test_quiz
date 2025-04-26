import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h1>ITクイズアプリへようこそ！</h1>
      <p>あなたのIT知識を試してみましょう！</p>
      <Link href="/quiz">
        <button
          style={{
            marginTop: "30px",
            padding: "15px 30px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          クイズを開始する
        </button>
      </Link>
    </div>
  );
}
