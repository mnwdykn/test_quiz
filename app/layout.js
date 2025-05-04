// layout.js
import ClientLayout from "./ClientLayout";
import ClientHeader from "../components/ClientHeader";

export const metadata = {
  title: "ITクイズアプリ",
  description: "あなたのIT知識を試す4択クイズ",
  icons: {
    icon: "/favicon.ico", // ← publicディレクトリに設置
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <ClientLayout>
          <ClientHeader />
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
