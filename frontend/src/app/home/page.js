import styles from "./home.module.css";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function HomePage() {
  const tracks = [
    { 
      title: "ChatGPT Mastery", 
      description: "Master prompt engineering and AI workflows",
      progress: 65,
      icon: "💬",
      slug: "chatgpt"
    },
    { 
      title: "CANVA AI", 
      description: "Design with AI-powered tools",
      progress: 0,
      icon: "🎨",
      slug: "canva"
    },
    { 
      title: "NOTION AI", 
      description: "Boost productivity with AI assistance",
      progress: 0,
      icon: "📝",
      slug: "notion"
    },
    { 
      title: "CURSOR AI", 
      description: "AI-powered code editor mastery",
      progress: 0,
      icon: "💻",
      slug: "cursor"
    },
    { 
      title: "JASPER AI", 
      description: "Content creation with AI",
      progress: 0,
      icon: "✍️",
      slug: "jasper"
    },
    { 
      title: "MIDJOURNEY", 
      description: "AI art generation mastery",
      progress: 0,
      icon: "🖼️",
      slug: "midjourney"
    }
  ];

  const stats = [
    { label: "Learning Streak", value: "5 days", icon: "🔥" },
    { label: "XP Earned", value: "1,240 XP", icon: "⭐" },
    { label: "Courses Started", value: "3", icon: "📚" },
    { label: "Hours Learning", value: "24h", icon: "⏱️" }
  ];

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <Sidebar />
        
        <div className={styles.content}>
          {/* HERO SECTION */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Welcome to <span className={styles.gradientText}>AI Mentora</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Master AI tools with personalized learning paths. Start your journey to becoming an AI expert.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100+</span>
                  <span className={styles.statLabel}>AI Tools Covered</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Active Learners</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>98%</span>
                  <span className={styles.statLabel}>Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.floatingIcons}>
                {["🤖", "💡", "🚀", "⚡"].map((icon, i) => (
                  <div key={i} className={styles.floatingIcon} style={{ animationDelay: `${i * 0.5}s` }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK STATS */}
          <section className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Your Learning Dashboard</h2>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CURRENT LEARNING */}
          <section className={styles.currentLearning}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Continue Learning</h2>
              <Link href="/dashboard" className={styles.viewAll}>
                View Dashboard →
              </Link>
            </div>
            
            <div className={styles.currentCourse}>
              <div className={styles.courseHeader}>
                <div className={styles.courseIcon}>💬</div>
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseTitle}>ChatGPT Mastery</h3>
                  <p className={styles.courseDesc}>
                    Advanced prompt engineering, AI workflows, and productivity automation
                  </p>
                </div>
              </div>
              
              <div className={styles.courseProgress}>
                <div className={styles.progressInfo}>
                  <span className={styles.progressLabel}>Course Progress</span>
                  <span className={styles.progressPercent}>65%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: '65%' }}
                  />
                </div>
                <div className={styles.progressDetails}>
                  <span>12 of 18 lessons completed</span>
                  <span>Estimated: 3 hours remaining</span>
                </div>
              </div>
              
              <div className={styles.courseActions}>
                <Link href="/track/chatgpt" className={styles.primaryBtn}>
                  Continue Learning →
                </Link>
                <button className={styles.secondaryBtn}>
                  Review Progress
                </button>
              </div>
            </div>
          </section>

          {/* EXPLORE TRACKS */}
          <section className={styles.tracksSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore AI Tracks</h2>
              <p className={styles.sectionSubtitle}>Choose your path to AI mastery</p>
            </div>
            
            <div className={styles.tracksGrid}>
              {tracks.map((track, index) => (
                <TrackCard key={index} {...track} />
              ))}
            </div>
          </section>

          {/* LEARNING PATH */}
          <section className={styles.pathSection}>
            <h2 className={styles.sectionTitle}>Your Learning Path</h2>
            <div className={styles.pathVisualization}>
              <div className={styles.pathStep}>
                <div className={styles.stepCircle}>1</div>
                <div className={styles.stepContent}>
                  <h4>Foundation</h4>
                  <p>Learn AI basics and terminology</p>
                </div>
              </div>
              <div className={styles.pathStep}>
                <div className={styles.stepCircle}>2</div>
                <div className={styles.stepContent}>
                  <h4>Core Tools</h4>
                  <p>Master essential AI applications</p>
                </div>
              </div>
              <div className={styles.pathStep}>
                <div className={styles.stepCircle}>3</div>
                <div className={styles.stepContent}>
                  <h4>Specialization</h4>
                  <p>Focus on your chosen AI tools</p>
                </div>
              </div>
              <div className={styles.pathStep}>
                <div className={styles.stepCircle}>4</div>
                <div className={styles.stepContent}>
                  <h4>Mastery</h4>
                  <p>Become an AI expert</p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}

/* TRACK CARD COMPONENT */
function TrackCard({ title, description, progress, icon, slug }) {
  return (
    <div className={styles.trackCard}>
      <div className={styles.trackCardHeader}>
        <div className={styles.trackIcon}>{icon}</div>
        <div className={styles.trackInfo}>
          <h3 className={styles.trackTitle}>{title}</h3>
          <p className={styles.trackDesc}>{description}</p>
        </div>
      </div>
      
      <div className={styles.trackProgress}>
        {progress > 0 ? (
          <>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{progress}% Complete</span>
          </>
        ) : (
          <span className={styles.newLabel}>New Track</span>
        )}
      </div>
      
      <div className={styles.trackActions}>
        {progress > 0 ? (
          <Link href={`/track/${slug}`} className={styles.continueBtn}>
            Continue
          </Link>
        ) : (
          <Link href={`/questionnaire?track=${slug}`} className={styles.exploreBtn}>
            Start Learning
          </Link>
        )}
        <button className={styles.previewBtn}>
          Preview
        </button>
      </div>
    </div>
  );
}