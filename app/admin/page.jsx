// /app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/admin-users")
        .then((res) => {
          if (res.status === 403) {
            setUnauthorized(true);
            setLoading(false);
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data?.users) {
            setUsers(data.users);
            setLoading(false);
          }
        })
        .catch(() => {
          setUnauthorized(true);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false); // ログアウト状態でも読み込みを解除
    }
  }, [status]);

  if (status === "loading") return <p>ログイン確認中...</p>;
  if (status === "unauthenticated") return <p>ログインが必要です。</p>;
  if (unauthorized) return <p>アクセス権がありません。</p>;
  if (loading) return <p>読み込み中...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👤 登録ユーザー一覧</h1>
      <ul className={styles.userList}>
        {users.map((u) => (
          <li key={u.email} className={styles.userItem}>
            <div>
              <strong>名前:</strong> {u.name}
            </div>
            <div>
              <strong>メール:</strong> {u.email}
            </div>
            <div>
              <strong>登録日時:</strong>{" "}
              {new Date(u.created_at).toLocaleString()}
            </div>
            <div>
              <strong>最終ログイン:</strong>{" "}
              {new Date(u.last_login).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
