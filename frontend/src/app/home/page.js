export default function HomePage() {
  return (
    <main className="home-wrapper">

      <nav className="navbar">
        <div className="logo">The Mentora AI</div>
        <div className="nav-links">
          <a>Dashboard</a>
          <a>Tracks</a>
          <button className="nav-cta">Profile</button>
        </div>
      </nav>

      <div className="layout">

        <aside className="sidebar">
          <h3>Mentora</h3>
          <ul>
            <li>Home</li>
            <li>My Courses</li>
            <li>Progress</li>
            <li>Settings</li>
          </ul>
        </aside>

        <section className="content">
          <h2>Your Current Course</h2>

          <div className="current-course">
            <div className="course-card active">
              <h3>ChatGPT Mastery</h3>
              <p>Continue learning prompt engineering and AI usage.</p>
              <button className="primary">Continue</button>
            </div>
          </div>

          <h2 style={{ marginTop: "60px" }}>Explore Tracks</h2>

          <div className="track-grid">
            <Track title="Claude AI" />
            <Track title="Gemini AI" />
            <Track title="AI for Coding" />
            <Track title="AI for Productivity" />
          </div>

        </section>
      </div>

      <footer>
        <p>© 2026 The Mentora AI</p>
      </footer>

    </main>
  );
}

function Track({ title }) {
  return (
    <div className="track-card">
      <h3>{title}</h3>
      <button className="secondary">Enroll</button>
    </div>
  );
}
