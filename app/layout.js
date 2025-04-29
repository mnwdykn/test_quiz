// app/layout.js
import "./globals.css";
import ClientLayout from "./ClientLayout"; // ← クライアントレイアウト導入

export const metadata = {
  title: "ITクイズアプリ",
  description: "IT基礎を楽しく学ぼう！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
