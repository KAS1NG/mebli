"use client";

import { useState } from "react";
import styles from "../styles/product/CommentsForm.module.scss";
import { addProductProperty } from "../actions/addProductProperty";

interface ProductProperty {
  name: string;
  text: string;
}

export default function AddProductProperties({ productId, accessToken }: { productId: number, accessToken?: string }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ProductProperty[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function parseInput(text: string) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        // допускаємо випадки з кількома ":" — перший розділює
        const idx = line.indexOf(":");
        if (idx === -1) return null;
        const name = line.slice(0, idx).trim();
        const text = line.slice(idx + 1).trim();
        if (!name) return null;
        return { name, text };
      })
      .filter(Boolean) as { name: string; text: string }[];
  }

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    setError(null);

    const comments = parseInput(input);
    if (comments.length === 0) {
      setError("Нічого для відправки — введіть характеристики у форматі 'ключ: значення' кожний з нового рядка.");
      setLoading(false);
      return;
    }

    try {
      const data = await addProductProperty(productId, comments, accessToken);
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setError(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Введіть характеристики</h2>
        <div className={styles.hint}>формат: <span className={styles.small}>ключ: значення</span></div>
      </div>

      <textarea
        className={styles.textarea}
        rows={8}
        placeholder={`Приклад:\nрозмір: 12х12 мм\nколір1: чорний\nматеріал: сталь`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Надсилаю..." : "Надіслати"}
        </button>

        <button
          className={styles.buttonSecondary}
          onClick={handleClear}
          type="button"
        >
          Очистити
        </button>
      </div>

      <div className={styles.resultWrap}>
        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <>
            <div className={styles.resultLabel}>Результат від сервера:</div>
            <pre className={styles.result}>{JSON.stringify(result, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
