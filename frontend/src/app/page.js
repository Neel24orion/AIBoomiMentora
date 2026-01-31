import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>

      {/* NAVBAR (FROM COMPONENTS) */}
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Your <span>AI-Powered</span>
            <br />
            Learning Mentor
          </h1>

          <p>
            Learn AI tools by actually using them. Mentora guides you
            in real time, tracks progress, and helps you master skills faster.
          </p>

          <div className="hero-actions">
            <Link href="/home">
              <button className="primary">Start Learning Free</button>
            </Link>
            <button className="secondary">Watch Demo</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="mentor-card">
            <div className="mentor-glow" />
            <p></p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Intelligent Features</h2>

        <div className="feature-grid">
          <Feature
            title="AI Mentorship"
            text="Real-time guidance while you use AI tools."
          />
          <Feature
            title="Progress Tracking"
            text="Track skill growth, XP, and milestones."
          />
          <Feature
            title="Gamified Learning"
            text="Levels, streaks, and achievements."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps">
        <h2>How Mentora AI Works</h2>

        <div className="step-grid">
          <Step
            n="1"
            t="Set Your Goal"
            d="Tell Mentora what you want to achieve."
          />
          <Step
            n="2"
            t="Learn by Doing"
            d="Execute tasks with live AI guidance."
          />
          <Step
            n="3"
            t="Level Up"
            d="Review, improve, and master tools."
          />
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <h2>Choose Your Plan</h2>

        <div className="pricing-grid">
          <Price
            title="Freemium"
            price="₹0"
            features={["5 AI Tasks ", "Basic tracking"]}
          />
          <PricePro />
          <Price
            title="Enterprise"
            price="₹999"
            features={["Teams", "Custom AI Tasks", "Support"]}
          />
        </div>
      </section>

      {/* FOOTER */}
      <Footer/>
    </main>
  );
}

/* ===================== */
/* COMPONENTS (LOCAL)    */
/* ===================== */

function Feature({ title, text }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({ n, t, d }) {
  return (
    <div className="step-card">
      <div className="step-num">{n}</div>
      <h3>{t}</h3>
      <p>{d}</p>
    </div>
  );
}

function Price({ title, price, features }) {
  return (
    <div className="price-card">
      <h3>{title}</h3>
      <h1>{price}</h1>

      {features.map((f) => (
        <p key={f}>✓ {f}</p>
      ))}

      <Link href="/home">
        <button className="secondary">Get Started</button>
      </Link>
    </div>
  );
}

function PricePro() {
  return (
    <div className="price-card pro">
      <h3>Premium</h3>
      <h1>₹199</h1>
      <p>✓ Unlimited AI Tasks</p>
      <p>✓ Advanced analytics</p>
      <p>✓ Priority support</p>

      <Link href="/home">
        <button className="primary">Start Free Trial</button>
      </Link>
    </div>
  );
}
