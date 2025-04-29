// app/ClientLayout.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import LoginButton from "../components/LoginButton"; // 共通表示のログイン状態

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <LoginButton />
      {children}
    </SessionProvider>
  );
}
