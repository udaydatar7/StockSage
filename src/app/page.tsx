import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "./landing/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingPage/>
    </main>
  );
}
