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
  const [activeLesson, setActiveLesson] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

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
          taskId: `t${startIdx + idx + 1}`,
          lessonIndex: lessonIndex
        }));
      });
      
      setLessonTaskMap(mapping);
    }
  }, [lessons, tasks]);

  const goToTask = (taskId, globalIndex) => {
    setCurrentNode(globalIndex);
    router.push(`/task/${taskId}`);
  };

  const toggleLesson = (lessonTitle) => {
    setActiveLesson(activeLesson === lessonTitle ? null : lessonTitle);
  };

  const calculateProgress = () => {
    return tasks.length > 0 ? ((currentNode + 1) / tasks.length) * 100 : 0;
  };

  const getLessonProgress = (lessonTitle) => {
    const lessonTasks = lessonTaskMap[lessonTitle] || [];
    if (lessonTasks.length === 0) return 0;
    
    const completed = lessonTasks.filter(task => task.globalIndex < currentNode).length;
    return (completed / lessonTasks.length) * 100;
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.layout}>
        <Sidebar />

        <section className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{name.replaceAll("-", " ")}</h1>
            <p className={styles.subtitle}>Your interactive learning journey</p>
            
            <div className={styles.controls}>
              <button 
                className={`${styles.filterBtn} ${showCompleted ? styles.active : ''}`}
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? 'Hide Completed' : 'Show Completed'}
              </button>
              <div className={styles.stats}>
                <span className={styles.statItem}>
                  <span className={styles.statNumber}>{lessons.length}</span> Lessons
                </span>
                <span className={styles.statItem}>
                  <span className={styles.statNumber}>{tasks.length}</span> Tasks
                </span>
                <span className={styles.statItem}>
                  <span className={styles.statNumber}>{Math.round(calculateProgress())}%</span> Complete
                </span>
              </div>
            </div>
          </div>

          <div className={styles.journeyContainer}>
            {/* TIMELINE NAVIGATION */}
            <div className={styles.timelineNav}>
              {lessons.map((lesson, idx) => {
                const progress = getLessonProgress(lesson.title);
                return (
                  <div 
                    key={lesson.title}
                    className={styles.navItem}
                    onClick={() => {
                      const lessonTasks = lessonTaskMap[lesson.title] || [];
                      if (lessonTasks.length > 0) {
                        setCurrentNode(lessonTasks[0].globalIndex);
                      }
                    }}
                  >
                    <div className={styles.navDot}>
                      <div 
                        className={styles.navProgress}
                        style={{ height: `${progress}%` }}
                      />
                      <span className={styles.navNumber}>{idx + 1}</span>
                    </div>
                    <span className={styles.navLabel}>{lesson.title}</span>
                  </div>
                );
              })}
            </div>

            {/* MAIN TIMELINE */}
            <div className={styles.timelineWrapper}>
              {/* PATH LINE WITH ANIMATED ELEMENTS */}
              <div className={styles.pathContainer}>
                <div className={styles.pathLine}></div>
                <div className={styles.pathGlow}></div>
                
                {/* ANIMATED PARTICLES */}
                {/* <div className={styles.particles}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i}
                      className={styles.particle}
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div> */}
              </div>

              {/* ROCKET CONTAINER */}
              <div className={styles.rocketContainer}>
                <div 
                  className={styles.rocket}
                  style={{
                    transform: `translateY(${currentNode * 120}px)`,
                  }}
                >
                  <div className={styles.rocketBody}>
                    <div className={styles.rocketWindow}></div>
                    <div className={styles.rocketFins}>
                      <div className={styles.rocketFin}></div>
                      <div className={styles.rocketFin}></div>
                    </div>
                    <div className={styles.rocketFlame}></div>
                  </div>
                </div>
              </div>

              {/* LESSONS AND TASKS */}
              <div className={styles.lessonsColumn}>
                {lessons.map((lesson, lessonIdx) => {
                  const lessonTasks = lessonTaskMap[lesson.title] || [];
                  const isExpanded = activeLesson === lesson.title || activeLesson === null;
                  const lessonProgress = getLessonProgress(lesson.title);

                  return (
                    <div 
                      key={lesson.title}
                      className={`${styles.lessonCard} ${isExpanded ? styles.expanded : ''}`}
                      onClick={() => toggleLesson(lesson.title)}
                    >
                      {/* LESSON HEADER */}
                      <div className={styles.lessonHeader}>
                        <div className={styles.lessonIcon}>
                          <span className={styles.iconNumber}>{lessonIdx + 1}</span>
                          <div 
                            className={styles.progressRing}
                            style={{
                              background: `conic-gradient(#00d4ff ${lessonProgress}%, rgba(124, 58, 237, 0.2) ${lessonProgress}% 100%)`
                            }}
                          />
                        </div>
                        
                        <div className={styles.lessonInfo}>
                          <div className={styles.lessonTitleRow}>
                            <h2 className={styles.lessonTitle}>{lesson.title}</h2>
                            <span className={styles.taskCount}>
                              {lessonTasks.length} tasks
                            </span>
                          </div>
                          <p className={styles.lessonDesc}>{lesson.description}</p>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill}
                              style={{ width: `${lessonProgress}%` }}
                            />
                          </div>
                        </div>

                        <button className={styles.expandBtn}>
                          {isExpanded ? '▼' : '►'}
                        </button>
                      </div>

                      {/* TASKS GRID */}
                      {isExpanded && (
                        <div className={styles.tasksGrid}>
                          {lessonTasks.map((task, taskIdx) => {
                            const isCompleted = task.globalIndex < currentNode;
                            const isCurrent = task.globalIndex === currentNode;
                            
                            if (!showCompleted && isCompleted) return null;

                            return (
                              <div
                                key={task.taskId}
                                className={`${styles.taskCard} ${
                                  isCompleted ? styles.completed : ''
                                } ${isCurrent ? styles.current : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToTask(task.taskId, task.globalIndex);
                                }}
                              >
                                <div className={styles.taskHeader}>
                                  <div className={styles.taskIcon}>
                                    {isCompleted ? (
                                      <div className={styles.completedIcon}>✓</div>
                                    ) : (
                                      <div className={styles.taskNumber}>{task.globalIndex + 1}</div>
                                    )}
                                  </div>
                                  
                                  <div className={styles.taskStatus}>
                                    <span className={styles.statusBadge}>
                                      {isCurrent ? 'Current' : isCompleted ? 'Completed' : 'Upcoming'}
                                    </span>
                                  </div>
                                </div>

                                <div className={styles.taskContent}>
                                  <h3 className={styles.taskLabel}>{task.label}</h3>
                                  <p className={styles.taskDesc}>
                                    {task.description || 'Complete this task to advance'}
                                  </p>
                                </div>

                                <div className={styles.taskFooter}>
                                  <div className={styles.difficulty}>
                                    <span className={styles.diffLabel}>
                                      Difficulty: {task.difficulty || 'Medium'}
                                    </span>
                                  </div>
                                  <button className={styles.startBtn}>
                                    {isCurrent ? 'Continue →' : isCompleted ? 'Review' : 'Start'}
                                  </button>
                                </div>

                                {/* HOVER EFFECTS */}
                                <div className={styles.taskHoverEffect}></div>
                                {isCurrent && <div className={styles.currentPulse}></div>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PROGRESS OVERVIEW */}
          <div className={styles.progressOverview}>
            <div className={styles.progressHeader}>
              <h3>Journey Progress</h3>
              <span>{Math.round(calculateProgress())}% Complete</span>
            </div>
            
            <div className={styles.progressDetails}>
              <div className={styles.progressMeter}>
                <div 
                  className={styles.meterFill}
                  style={{ width: `${calculateProgress()}%` }}
                />
                <div className={styles.meterLabels}>
                  {Array.from({ length: Math.min(tasks.length, 6) }).map((_, i) => {
                    const idx = Math.floor((tasks.length - 1) * (i / 5));
                    return (
                      <span 
                        key={i}
                        className={`${styles.meterLabel} ${idx <= currentNode ? styles.active : ''}`}
                      >
                        Task {idx + 1}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>📚</div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>{lessons.length}</span>
                    <span className={styles.statLabel}>Lessons</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>✅</div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>
                      {currentNode + 1} / {tasks.length}
                    </span>
                    <span className={styles.statLabel}>Tasks Completed</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>⏱️</div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>
                      {Math.round((tasks.length - currentNode - 1) * 15)}
                    </span>
                    <span className={styles.statLabel}>Est. Time Remaining (min)</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🚀</div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>
                      {Math.round(calculateProgress())}%
                    </span>
                    <span className={styles.statLabel}>Overall Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </section>
      </div>
    </main>
  );
}