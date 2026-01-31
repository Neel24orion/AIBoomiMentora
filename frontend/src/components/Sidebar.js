"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>The Mentora AI</div>

      <ul className={styles.menu}>
        <li className={styles.active}>Home</li>
        <li>My Courses</li>

        {/* DASHBOARD → /dashboard */}
        <li>
          <Link
            href="/Dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </li>

        {/* SETTINGS WITH DROPDOWN */}
        <li
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          Settings

          {open && (
            <ul style={{ marginTop: "8px", paddingLeft: "14px" }}>
              <li>
                <Link
                  href="/Profile"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </li>

              <li
                onClick={(e) => {
                  e.stopPropagation(); // prevent closing immediately
                  console.log("Sign out clicked");
                }}
              >
                Sign Out
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
