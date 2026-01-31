"use client";

import { use, useState } from "react";   // 👈 ADD use
import { useRouter } from "next/navigation";
import styles from "./track.module.css";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

export default function TrackPage({ params }) {
  const router = useRouter();

  // 👇 IMPORTANT FIX
  const resolvedParams = use(params);
  const rawId = resolvedParams.trackId;
  const name = Array.isArray(rawId) ? rawId[0] : rawId || "";
  
  const taskId = resolvedParams.taskId;


  const [currentNode, setCurrentNode] = useState(0);

  const journeyNodes = [
    { id: 1, label: "Intro", position: 15, taskId: "t1" },
    { id: 2, label: "Basics", position: 25, taskId: "t2" },
    { id: 3, label: "Practice", position: 35, taskId: "t3" },
    { id: 4, label: "Structured", position: 50, taskId: "t4" },
    { id: 5, label: "Templates", position: 60, taskId: "t5" },
    { id: 6, label: "Advanced", position: 75, taskId: "t6" },
    { id: 7, label: "Master", position: 85, taskId: "t7" },
    { id: 8, label: "Complete", position: 95, taskId: "t8" },
  ];

  const lessons = [
    { id: 1, title: "Lesson 1", subtitle: "Introduction to AI", start: 10 },
    { id: 2, title: "Lesson 2", subtitle: "Structured Prompts", start: 45 },
    { id: 3, title: "Lesson 3", subtitle: "Advanced Techniques", start: 72 },
  ];

  const goToTask = (taskId, index) => {
    setCurrentNode(index);
    router.push(`/task/${taskId}`);
  };

  return (
    <main className={styles.wrapper}>

      
    

      <div className={styles.layout}>
        <Sidebar />

        <section className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {name.replaceAll("-", " ")}
            </h1>
            <p className={styles.subtitle}>
              Your learning journey to mastery
            </p>
          </div>

          <div className={styles.journeyContainer}>

            {/* SVG PATH */}
            <svg className={styles.pathSvg}>
              <path
                d="M 150 50 Q 180 200 150 350 Q 120 500 150 650 Q 180 800 150 950"
                stroke="url(#grad)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,10"
              />
              <defs>
                <linearGradient id="grad">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* LESSON LABELS */}
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={styles.lessonMarker}
                style={{ top: `${lesson.start}%` }}
              >
                <div className={styles.lessonLabel}>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.subtitle}</p>
                </div>
              </div>
            ))}

            {/* NODES */}
            {journeyNodes.map((node, index) => {
              const isCompleted = index <= currentNode;
              const isCurrent = index === currentNode;

              return (
                <div
                  key={node.id}
                  className={`${styles.journeyNode}
                    ${isCompleted ? styles.completed : ""}
                    ${isCurrent ? styles.current : ""}`}
                  style={{ top: `${node.position}%` }}
                  onClick={() => goToTask(node.taskId, index)}
                >
                  <div className={styles.nodeCircle}>
                    <div className={styles.nodeInner}>
                      {isCompleted ? "✓" : index + 1}
                    </div>
                  </div>
                  <div className={styles.nodeLabel}>{node.label}</div>
                </div>
              );
            })}

            {/* ROCKET */}
            <div
              className={styles.rocket}
              style={{ top: `${journeyNodes[currentNode]?.position}%` }}
            >
              🚀
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className={styles.progressInfo}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((currentNode + 1) / journeyNodes.length) * 100}%`,
                }}
              />
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
