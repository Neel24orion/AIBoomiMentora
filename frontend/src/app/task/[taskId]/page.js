"use client";

import { use } from "react";   // 👈 IMPORTANT
import styles from "./task.module.css";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

export default function TaskPage({ params }) {

  // 👇 FIX
  const resolvedParams = use(params);
  const taskId = resolvedParams.taskId || "demo";

  return (
    <main className={styles.wrapper}>

      
      

      <div className={styles.layout}>

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <section className={styles.content}>

          <h1 className={styles.title}>Task {taskId}</h1>

          {/* TASK DESCRIPTION */}
          <div className={styles.card}>
            <h3>Task Description</h3>
            <p>
              Generate a Python script that reads a CSV file and prints
              the number of rows. (Placeholder — API will replace this)
            </p>
          </div>

          {/* PROMPT INPUT */}
          <div className={styles.card}>
            <h3>Your Prompt</h3>
            <textarea
              className={styles.textarea}
              placeholder="Paste the prompt you gave to the AI here..."
            />
          </div>

          {/* LLM OUTPUT */}
          <div className={styles.card}>
            <h3>LLM Output</h3>
            <textarea
              className={styles.textarea}
              placeholder="Paste the AI response/output here..."
            />
          </div>

          {/* ACTION BUTTON */}
          <button className={styles.evaluateBtn}>
            Evaluate Task
          </button>

        </section>
      </div>
      
    </main>
  );
  
}
