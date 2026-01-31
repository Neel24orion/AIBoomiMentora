import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Your AI learning progress at a glance</p>
      </header>

      {/* STATS */}
      <section className={styles.statsGrid}>
        <StatCard title="XP Earned" value="1,240 XP" />
        <StatCard title="Current Streak" value="5 Days 🔥" />
        <StatCard title="Completed Tasks" value="18" />
      </section>

      {/* CURRENT TRACK */}
      <section className={styles.section}>
        <h2>Current Track</h2>

        <div className={styles.trackCard}>
          <div>
            <h3>ChatGPT Mastery</h3>
            <p>Prompt engineering · AI workflows · Productivity</p>
          </div>

          <button className={styles.primaryBtn}>Continue</button>
        </div>
      </section>

      {/* TRACKS */}
      <section className={styles.section}>
        <h2>Explore Tracks</h2>

        <div className={styles.trackGrid}>
          <TrackCard title="Claude AI" />
          <TrackCard title="Gemini AI" />
          <TrackCard title="AI for Coding" />
          <TrackCard title="AI for Productivity" />
        </div>
      </section>

    </main>
  );
}

/* COMPONENTS */

function StatCard({ title, value }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statTitle}>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

function TrackCard({ title }) {
  return (
    <div className={styles.trackMiniCard}>
      <h3>{title}</h3>
      <button className={styles.secondaryBtn}>View</button>
    </div>
  );
}
