"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "../styles/preloader.module.scss";

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(true); // для плавного приховування
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Показуємо при першому завантаженні
  useEffect(() => {
    const images = Array.from(document.images);
    let loaded = 0;
    const total = images.length;

    if (total === 0) {
      hidePreloader();
      return;
    }

    const onImageLoad = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded === total) {
        hidePreloader();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
  }, []);

  // Показуємо при переходах
  useEffect(() => {
    if (!active && !visible) {
      showPreloader();
    }

    setProgress(0);

    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += Math.floor(Math.random() * 10) + 5;
      setProgress((prev) => Math.min(prev + 10, 90));
      if (fakeProgress >= 90) clearInterval(interval);
    }, 120);

    timeoutRef.current = setTimeout(() => {
      setProgress(100);
      hidePreloader();
    }, 500);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Функції керування видимістю
  const hidePreloader = () => {
    setActive(false); // почати анімацію fade-out
    setTimeout(() => setVisible(false), 300); // після анімації забрати з DOM
  };

  const showPreloader = () => {
    setVisible(true);
    setTimeout(() => setActive(true), 10); // дати час на apply класу
  };

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${active ? styles.active : styles.hidden}`}>
      <div className={styles.loaderBox}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.percent}>{progress}%</div>
      </div>
    </div>
  );
}
