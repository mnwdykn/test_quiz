"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton({ render }) {
  const { data: session, status } = useSession();

  if (status === "loading") return render({ status });

  return render({
    status,
    session,
    signIn,
    signOut,
  });
}
