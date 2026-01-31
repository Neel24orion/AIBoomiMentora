import Footer from "../../components/Footer";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <Sidebar />
        
        <div className={styles.content}>
          {/* HEADER */}
          <header className={styles.header}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Your AI learning progress at a glance</p>
          </header>

          {/* STATS GRID */}
          <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <StatCard 
                title="XP Earned" 
                value="1,240 XP"
                icon="⭐"
                color="primary"
              />
              <StatCard 
                title="Current Streak" 
                value="5 Days"
                icon="🔥"
                color="secondary"
              />
              <StatCard 
                title="Completed Tasks" 
                value="18"
                icon="✅"
                color="accent"
              />
              <StatCard 
                title="Active Days" 
                value="7"
                icon="📅"
                color="purple"
              />
            </div>
          </section>

          {/* CURRENT TRACK */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Current Track</h2>
              <span className={styles.sectionBadge}>Active</span>
            </div>

            <div className={styles.currentTrack}>
              <div className={styles.trackInfo}>
                <div className={styles.trackIcon}>💬</div>
                <div>
                  <h3 className={styles.trackName}>ChatGPT Mastery</h3>
                  <p className={styles.trackDesc}>Prompt engineering · AI workflows · Productivity</p>
                </div>
              </div>
              
              <div className={styles.trackProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '65%' }}></div>
                </div>
                <span className={styles.progressText}>65% Complete</span>
              </div>

              <div className={styles.trackActions}>
                <button className={styles.primaryBtn}>Continue Learning</button>
                <button className={styles.secondaryBtn}>View Details</button>
              </div>
            </div>
          </section>

          {/* RECENT ACTIVITY */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <button className={styles.viewAllBtn}>View All →</button>
            </div>

            <div className={styles.activityList}>
              <ActivityItem 
                title="Completed: Advanced Prompting"
                time="2 hours ago"
                type="completed"
              />
              <ActivityItem 
                title="Started: AI Workflow Design"
                time="Yesterday"
                type="started"
              />
              <ActivityItem 
                title="Earned: 150 XP"
                time="2 days ago"
                type="earned"
              />
            </div>
          </section>

          {/* EXPLORE TRACKS */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore Tracks</h2>
              <p className={styles.sectionSubtitle}>Expand your AI knowledge</p>
            </div>

            <div className={styles.tracksGrid}>
              <TrackCard 
                title="Claude AI" 
                description="Advanced conversation AI"
                icon="🤖"
              />
              <TrackCard 
                title="Gemini AI" 
                description="Google's multimodal AI"
                icon="🔮"
              />
              <TrackCard 
                title="AI for Coding" 
                description="Code generation & assistance"
                icon="💻"
              />
              <TrackCard 
                title="AI for Productivity" 
                description="Automate your workflow"
                icon="⚡"
              />
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}

/* COMPONENTS */

function StatCard({ title, value, icon, color = 'primary' }) {
  return (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.statHeader}>
        <span className={styles.statIcon}>{icon}</span>
        <span className={styles.statTitle}>{title}</span>
      </div>
      <h3 className={styles.statValue}>{value}</h3>
    </div>
  );
}

function TrackCard({ title, description, icon }) {
  return (
    <div className={styles.trackCard}>
      <div className={styles.trackCardHeader}>
        <div className={styles.trackCardIcon}>{icon}</div>
        <h3 className={styles.trackCardTitle}>{title}</h3>
      </div>
      <p className={styles.trackCardDesc}>{description}</p>
      <button className={styles.trackCardBtn}>Start Learning</button>
    </div>
  );
}

function ActivityItem({ title, time, type }) {
  const getTypeIcon = () => {
    switch(type) {
      case 'completed': return '✅';
      case 'started': return '🚀';
      case 'earned': return '⭐';
      default: return '📝';
    }
  };

  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>{getTypeIcon()}</div>
      <div className={styles.activityContent}>
        <h4 className={styles.activityTitle}>{title}</h4>
        <span className={styles.activityTime}>{time}</span>
      </div>
    </div>
  );
}