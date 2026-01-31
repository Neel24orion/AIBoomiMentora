"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./track.module.css";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

export default function TrackPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawId = resolvedParams.trackId;
  const name = Array.isArray(rawId) ? rawId[0] : rawId || "";

  const [currentNode, setCurrentNode] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [lessonTaskMap, setLessonTaskMap] = useState({});

  // Fetch lessons
  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch(`http://localhost:8000/lessons/${name}`);
        const data = await res.json();
        setLessons(data.lessons || []);
      } catch (err) {
        console.error("Lesson fetch error", err);
      }
    }
    if (name) fetchLessons();
  }, [name]);

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`http://localhost:8000/tasks/${name}`);
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (err) {
        console.error("Task fetch error", err);
      }
    }
    if (name) fetchTasks();
  }, [name]);

  // Group tasks by lesson
  useEffect(() => {
    if (lessons.length && tasks.length) {
      const mapping = {};
      
      lessons.forEach((lesson, lessonIndex) => {
        const tasksPerLesson = Math.ceil(tasks.length / lessons.length);
        const startIdx = lessonIndex * tasksPerLesson;
        const endIdx = Math.min(startIdx + tasksPerLesson, tasks.length);
        
        mapping[lesson.title] = tasks.slice(startIdx, endIdx).map((task, idx) => ({
          ...task,
          globalIndex: startIdx + idx,
          taskId: `t${startIdx + idx + 1}`
        }));
      });
      
      setLessonTaskMap(mapping);
    }
  }, [lessons, tasks]);

  const goToTask = (taskId, globalIndex) => {
    setCurrentNode(globalIndex);
    router.push(`/task/${taskId}`);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.layout}>
        <Sidebar />

        <section className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{name.replaceAll("-", " ")}</h1>
            <p className={styles.subtitle}>Your learning journey to mastery</p>
          </div>

          <div className={styles.journeyWrapper}>
            {/* PATH LINE */}
            <div className={styles.pathLine}></div>

            {/* ROCKET */}
            {tasks.length > 0 && (
              <div
                className={styles.rocket}
                style={{
                  top: `${
                    Math.floor(currentNode / Math.ceil(tasks.length / lessons.length)) * 400 +
                    140 +
                    (currentNode % Math.ceil(tasks.length / lessons.length)) * 100
                  }px`,
                }}
              >
                🚀
              </div>
            )}

            {/* LESSONS AND TASKS */}
            {lessons.map((lesson, lessonIdx) => {
              const lessonTasks = lessonTaskMap[lesson.title] || [];
              const sectionTop = lessonIdx * 400;

              return (
                <div
                  key={lesson.title}
                  className={styles.lessonSection}
                  style={{ top: `${sectionTop}px` }}
                >
                  {/* LESSON HEADER */}
                  <div className={styles.lessonBox}>
                    <h2 className={styles.lessonTitle}>{lesson.title}</h2>
                    <p className={styles.lessonDesc}>{lesson.description}</p>
                  </div>

                  {/* TASKS */}
                  <div className={styles.tasksContainer}>
                    {lessonTasks.map((task, taskIdx) => {
                      const isCompleted = task.globalIndex < currentNode;
                      const isCurrent = task.globalIndex === currentNode;

                      return (
                        <div
                          key={task.taskId}
                          className={`${styles.taskItem} ${
                            isCompleted ? styles.completed : ""
                          } ${isCurrent ? styles.current : ""}`}
                          onClick={() => goToTask(task.taskId, task.globalIndex)}
                        >
                          {/* NODE */}
                          <div className={styles.taskNode}>
                            <div className={styles.nodeCircle}>
                              {isCompleted ? "✓" : task.globalIndex + 1}
                            </div>
                          </div>

                          {/* LABEL */}
                          <div className={styles.taskLabel}>{task.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PROGRESS */}
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((currentNode + 1) / Math.max(tasks.length, 1)) * 100}%`,
                }}
              />
            </div>
            <p className={styles.progressText}>
              {currentNode + 1} of {tasks.length} completed
            </p>
          </div>

          <Footer />
        </section>
      </div>
    </main>
  );
}