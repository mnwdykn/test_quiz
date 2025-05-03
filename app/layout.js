// layout.js
import ClientLayout from "./ClientLayout";
import ClientHeader from "../components/ClientHeader";

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
