import Link from "next/link";
import styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <div className={styles.container}>
        <h1>Adventure AI</h1>
        <div className={styles.textContainer}>
          <p>Choose your own adventure</p>
          <div className={styles.buttonContainer}>
            <Link href="/game">
              <button className={styles.standardButton}>Play Now!</button>
            </Link>
            <Link href="/login">
              <button className={styles.standardButton}>Log in</button>
            </Link>
            <Link href="/signup">
              <button className={styles.signupButton}>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
