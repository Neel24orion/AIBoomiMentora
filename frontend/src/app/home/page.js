import styles from "./home.module.css";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.homeWrapper}>

      

      <div className={styles.layout}>

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <section className={styles.content}>
          <h2>Your Current Course</h2>

          {/* CURRENT COURSE → DIRECT TRACK */}
          <div className={`${styles.courseCard} ${styles.active}`}>
            <h3>ChatGPT Mastery</h3>
            <p>Continue learning prompt engineering and AI usage.</p>

            <Link href="/track/chatgpt" className={styles.primary}>
              Continue
            </Link>
          </div>

          <h2 className={styles.sectionTitle}>Explore Tracks</h2>

          <div className={styles.trackGrid}>
            <Track title="CANVA" />
            <Track title="NOTION" />
            <Track title="CURSOR" />
            <Track title="JASPER" />
          </div>

        </section>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 The Mentora AI a product by SnehalAnand Techventures</p>
      </footer>
    </main>
  );
}

/* TRACK CARD COMPONENT */
function Track({ title }) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={styles.trackCard}>
      <h3>{title}</h3>

      {/* EXPLORE → QUESTIONNAIRE */}
      <Link href={`/questionnaire?track=${slug}`} className={styles.secondary}>
        Explore
      </Link>
    </div>
  );
}
