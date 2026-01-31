import styles from "./questionaire.module.css";

export default function Questionnaire() {
  return (
    <div className={styles.page}>

      <div className={styles.card}>
        <h1 className={styles.title}>Let’s Personalize Your Journey</h1>
        <p className={styles.subtitle}>
          Answer a few quick questions so Mentora can tailor your learning path.
        </p>

        {/* QUESTION 1 */}
        <div className={styles.questionBlock}>
          <h3>Your current level</h3>
          <div className={styles.options}>
            <label><input type="radio" name="level" /> Beginner</label>
            <label><input type="radio" name="level" /> Intermediate</label>
            <label><input type="radio" name="level" /> Advanced</label>
          </div>
        </div>

        {/* QUESTION 2 */}
        <div className={styles.questionBlock}>
          <h3>Your end goal</h3>
          <div className={styles.options}>
            <label><input type="radio" name="goal" /> Learn AI tools for productivity</label>
            <label><input type="radio" name="goal" /> Become job-ready</label>
            <label><input type="radio" name="goal" /> Build AI products</label>
          </div>
        </div>

        {/* QUESTION 3 */}
        <div className={styles.questionBlock}>
          <h3>Time you can dedicate per day</h3>
          <div className={styles.options}>
            <label><input type="radio" name="time" /> 15–30 minutes</label>
            <label><input type="radio" name="time" /> 30–60 minutes</label>
            <label><input type="radio" name="time" /> 1–2 hours</label>
          </div>
        </div>

        <button className={styles.primaryBtn}>
          Continue
        </button>
      </div>

    </div>
  );
}
