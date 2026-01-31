import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Mentora</div>

      <ul className={styles.menu}>
        <li className={styles.active}>Home</li>
        <li>My Courses</li>
        <li>Progress</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}
