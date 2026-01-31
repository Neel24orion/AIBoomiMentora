import styles from "./Profile.module.css";

export default function ProfilePage() {
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
          <span>👤</span>
        </div>

        <div className={styles.info}>
          <h2>Neel Rawal</h2>
          <p className={styles.email}>neel@example.com</p>
        </div>
      </section>

      {/* DETAILS */}
      <section className={styles.section}>
        <h3>Learning Preferences</h3>

        <div className={styles.detailGrid}>
          <Detail label="Current Level" value="Intermediate" />
          <Detail label="Goal" value="Build AI Products" />
          <Detail label="Daily Time" value="1–2 hours" />
        </div>
      </section>

      {/* ACTIONS */}
      <section className={styles.actions}>
        <button className={styles.primaryBtn}>Edit Profile</button>
        <button className={styles.secondaryBtn}>Sign Out</button>
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
