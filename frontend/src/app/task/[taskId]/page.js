"use client";

import { use, useEffect, useState } from "react";
import styles from "./task.module.css";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

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

  return (
    <main className={styles.wrapper}>
      

      <div className={styles.layout}>
        <Sidebar />

        <section className={styles.content}>
          <h1 className={styles.title}>Task: {track}</h1>

          {/* TASK DISPLAY */}
          {loading ? (
            <p>Loading task...</p>
          ) : (
            <div className={styles.card}>
              <h3>Your Task</h3>
              <pre className={styles.taskText}>{task}</pre>
            </div>
          )}

          {/* PROMPT INPUT */}
          <div className={styles.card}>
            <h3>Your Prompt</h3>
            <textarea
              className={styles.textarea}
              placeholder="Paste the prompt you gave to the AI here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* LLM OUTPUT */}
          <div className={styles.card}>
            <h3>LLM Output</h3>
            <textarea
              className={styles.textarea}
              placeholder="Paste the AI response/output here..."
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>

          {/* EVALUATE BUTTON */}
          <button
            className={styles.evaluateBtn}
            onClick={evaluateTask}
            disabled={evaluating}
          >
            {evaluating ? "Evaluating..." : "Evaluate Task"}
          </button>

          {/* EVALUATION RESULT */}
          {evaluation && (
            <div className={styles.card}>
              <h3>Evaluation</h3>
              <pre className={styles.evalText}>{evaluation}</pre>
            </div>
          )}

        </section>
      </div>
      
    </main>
  );
  
}
