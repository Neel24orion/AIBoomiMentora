"use client";

import { use, useEffect, useState } from "react";
import styles from "./task.module.css";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

export default function TaskPage({ params }) {
  const resolvedParams = use(params);
  const track = resolvedParams.taskId || "chatgpt";

  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  // ---- FETCH TASK ----
  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch("http://localhost:8000/generate-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track }),
        });

        const data = await res.json();
        setTask(data.task);
      } catch (err) {
        setTask("Error loading task");
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [track]);

  // ---- EVALUATE ----
  const evaluateTask = async () => {
    setEvaluating(true);

    try {
      const res = await fetch("http://localhost:8000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          output,
        }),
      });

      const data = await res.json();
      setEvaluation(data.evaluation);
    } catch (err) {
      setEvaluation("Error evaluating task");
    }

    setEvaluating(false);
  };

  // Clear all inputs
  const clearAll = () => {
    setPrompt("");
    setOutput("");
    setEvaluation("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <Sidebar />
        
        <div className={styles.content}>
          {/* HEADER */}
          <header className={styles.header}>
            <h1 className={styles.title}>AI Task Challenge</h1>
            <p className={styles.subtitle}>Complete the task and get evaluated</p>
            <div className={styles.taskInfo}>
              <span className={styles.taskTag}>Track: {track}</span>
              <span className={styles.taskStatus}>Active Task</span>
            </div>
          </header>

          {/* TASK DISPLAY */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Task Details</h2>
              {loading && <span className={styles.loadingDot}>Loading...</span>}
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🎯</div>
                <div>
                  <h3 className={styles.cardTitle}>Your Task</h3>
                  <p className={styles.cardHint}>Complete this challenge to advance</p>
                </div>
              </div>
              
              <div className={styles.taskContent}>
                {loading ? (
                  <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <span>Loading task...</span>
                  </div>
                ) : (
                  <pre className={styles.taskText}>{task}</pre>
                )}
              </div>
            </div>
          </section>

          {/* INPUT SECTIONS */}
          <div className={styles.inputsGrid}>
            {/* PROMPT INPUT */}
            <div className={styles.inputSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Your Prompt</h2>
                <span className={styles.sectionHint}>Step 1: Write your prompt</span>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>💭</div>
                  <h3 className={styles.cardTitle}>AI Prompt</h3>
                </div>
                
                <textarea
                  className={styles.textarea}
                  placeholder="Paste the prompt you gave to the AI here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                />
                
                <div className={styles.charCount}>
                  {prompt.length} characters
                </div>
              </div>
            </div>

            {/* LLM OUTPUT */}
            <div className={styles.inputSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>AI Response</h2>
                <span className={styles.sectionHint}>Step 2: Paste AI's response</span>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🤖</div>
                  <h3 className={styles.cardTitle}>LLM Output</h3>
                </div>
                
                <textarea
                  className={styles.textarea}
                  placeholder="Paste the AI response/output here..."
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  rows={6}
                />
                
                <div className={styles.charCount}>
                  {output.length} characters
                </div>
              </div>
            </div>
          </div>

          {/* EVALUATION CONTROLS */}
          <section className={styles.evaluationSection}>
            <div className={styles.controls}>
              <button
                className={styles.clearBtn}
                onClick={clearAll}
                disabled={!prompt && !output && !evaluation}
              >
                Clear All
              </button>
              
              <button
                className={`${styles.evaluateBtn} ${evaluating ? styles.evaluating : ''}`}
                onClick={evaluateTask}
                disabled={evaluating || !prompt || !output}
              >
                {evaluating ? (
                  <>
                    <div className={styles.spinner}></div>
                    Evaluating...
                  </>
                ) : (
                  'Evaluate Task'
                )}
              </button>
            </div>

            {/* EVALUATION RESULT */}
            {evaluation && (
              <div className={styles.evaluationResult}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Evaluation Result</h2>
                  <span className={styles.scoreBadge}>Score: 8.5/10</span>
                </div>
                
                <div className={`${styles.card} ${styles.evaluationCard}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>📊</div>
                    <div>
                      <h3 className={styles.cardTitle}>AI Evaluation</h3>
                      <p className={styles.cardHint}>Feedback on your prompt and response</p>
                    </div>
                  </div>
                  
                  <div className={styles.evaluationContent}>
                    <pre className={styles.evalText}>{evaluation}</pre>
                  </div>
                  
                  <div className={styles.evaluationActions}>
                    <button className={styles.secondaryBtn}>
                      Save Result
                    </button>
                    <button className={styles.secondaryBtn}>
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}