import styles from "./home.module.css";
import Sidebar from "../../components/Sidebar";
import Link from "next/link"; // ✅ ADD THIS LINE



export default function HomePage() {
  return (
    <main className={styles.homeWrapper}>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>The Mentora AI</div>
        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>
  Dashboard
</Link>

          <a>Tracks</a>
          <button className={styles.navCta}>Profile</button>
        </div>
      </nav>

      <div className={styles.layout}>

        {/* SIDEBAR COMPONENT */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <section className={styles.content}>
          <h2>Your Current Course</h2>

          <div className={styles.currentCourse}>
            <div className={`${styles.courseCard} ${styles.active}`}>
              <h3>ChatGPT Mastery</h3>
              <p>Continue learning prompt engineering and AI usage.</p>

              {/* ✅ CONTINUE → /questionnaire */}
              <Link href="/questionnaire">
                <button className={styles.primary}>Continue</button>
              </Link>

            </div>
          </div>

          <h2 style={{ marginTop: "60px" }}>Explore Tracks</h2>

          <div className={styles.trackGrid}>
            <Track title="Claude AI" />
            <Track title="Gemini AI" />
            <Track title="AI for Coding" />
            <Track title="AI for Productivity" />
          </div>

        </section>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 The Mentora AI</p>
      </footer>

    </main>
  );
}

function Track({ title }) {
  return (
    <div className={styles.trackCard}>
      <h3>{title}</h3>
      <button className={styles.secondary}>Enroll</button>
    </div>
  );
}
