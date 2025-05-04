import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // ← 後述するadminクライアント

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      const { email, name } = user;

      // Supabaseにユーザー情報を upsert（なければ追加、あれば更新）
      try {
        await supabaseAdmin.from("users").upsert(
          {
            email,
            name,
            last_login: new Date().toISOString(),
          },
          { onConflict: "email" }
        );
      } catch (err) {
        console.error("ユーザーの記録に失敗しました:", err);
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
