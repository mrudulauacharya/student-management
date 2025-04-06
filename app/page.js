// ✅ Add this line at the top
import LoginButton from "./components/LoginButton";
import Navbar from "./components/Navbar";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Student Management System</h1>
      <p className={styles.subtitle}>Manage your students easily.</p>

      {/* ✅ Add the Login Button below the subtitle */}
      <LoginButton />

      <Link href="/students" className={styles.button}>
        View Students
      </Link>
    </div>
  );
}
