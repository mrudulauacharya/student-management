"use client"; // Required for React hooks in App Router
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../lib/supabase";
import styles from "./create.module.css"; // Import fixed CSS module

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("students").insert([student]);

    if (error) {
      setError(error.message);
    } else {
      router.push("/students"); // Redirect to students list
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Student</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required className={styles.input} />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required className={styles.input} />
        <input type="number" name="age" placeholder="Age" value={student.age} onChange={handleChange} required className={styles.input} />
        <input type="text" name="course" placeholder="Course" value={student.course} onChange={handleChange} required className={styles.input} />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
