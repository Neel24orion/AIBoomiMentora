import styles from "./home.module.css";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.homeWrapper}>

      <nav className={styles.navbar}>
        <div className={styles.logo}>The Mentora AI</div>
        <div className={styles.navLinks}>
          <a>Dashboard</a>
          <a>Tracks</a>
          <button className={styles.navCta}>Profile</button>
        </div>
      </nav>

      <div className={styles.layout}>

        <Sidebar />

        <section className={styles.content}>
          <h2>Your Current Course</h2>

          <div className={styles.currentCourse}>
            <Link
              href="/track/chatgpt"
              className={`${styles.courseCard} ${styles.active}`}
            >
              <h3>ChatGPT Mastery</h3>
              <p>Continue learning prompt engineering and AI usage.</p>
              <div className={styles.primary}>Continue</div>
            </Link>
          </div>

          <h2 className={styles.sectionTitle}>Explore Tracks</h2>

          <div className={styles.trackGrid}>
            <Track title="Claude AI" />
            <Track title="Gemini AI" />
            <Track title="AI for Coding" />
            <Track title="AI for Productivity" />
          </div>

        </section>
      </div>

      <footer className={styles.footer}>
        <p>© 2026 The Mentora AI</p>
      </footer>
    </main>
  );
}

function Track({ title }) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/track/${slug}`} className={styles.trackCard}>
      <h3>{title}</h3>
      <div className={styles.secondary}>Enroll</div>
    </Link>
  );
}
