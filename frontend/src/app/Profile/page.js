"use client";

import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import styles from "./Profile.module.css";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <h1>Your Profile</h1>
        <p>Manage your account and learning preferences</p>
      </header>

      {/* PROFILE CARD */}
      <section className={styles.card}>
        <div className={styles.avatar}>
          <span>{user?.avatar_icon || "👤"}</span>
        </div>

        <div className={styles.info}>
          <h2>{user?.display_name || user?.username || "User"}</h2>
          <p className={styles.email}>{user?.email || "email@example.com"}</p>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.section}>
        <h3>Learning Stats</h3>

        <div className={styles.detailGrid}>
          <Detail label="Streak Days" value={user?.stats?.streak_days || 0} />
          <Detail label="Total XP" value={user?.stats?.total_xp || 0} />
          <Detail label="Hours Learned" value={Math.round(user?.stats?.total_hours || 0)} />
        </div>
      </section>

      {/* ACTIONS */}
      <section className={styles.actions}>
        <button className={styles.primaryBtn} onClick={() => router.push("/home")}>
          Back to Home
        </button>
        <button className={styles.secondaryBtn} onClick={handleSignOut}>
          Sign Out
        </button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 The Mentora AI · a product by SnehalAnand Techventures</p>
      </footer>

    </main>
  );
}

/* SMALL COMPONENT */
function Detail({ label, value }) {
  return (
    <div className={styles.detailCard}>
      <p className={styles.label}>{label}</p>
      <h4>{value}</h4>
    </div>
  );
}
