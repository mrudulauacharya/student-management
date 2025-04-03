import Link from "next/link";
import styles from "./page.module.css"; // Import CSS

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Student Management System</h1>
      <p className={styles.subtitle}>Manage your students easily.</p>
      <Link href="/students" className={styles.button}>
        View Students
      </Link>
    </div>
  );
}
