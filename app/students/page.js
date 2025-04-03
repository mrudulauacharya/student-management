"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../../lib/supabase";
import styles from "./page.module.css";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await supabase.from("students").select("*");
      setStudents(data || []);
    };

    fetchStudents();

    // Real-time subscription to listen for new students added
    const subscription = supabase
      .channel("students")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "students" }, (payload) => {
        setStudents((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📚 Students List</h1>

      <Link href="/students/create" className={styles.addButton}>
        <span className={styles.addIcon}>➕</span> Add New Student
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
