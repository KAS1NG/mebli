"use client";

import { useState } from "react";
import styles from "../../styles/stock/stockList.module.scss";
import { createVariant } from "@/app/api/stock/stockService";

function AddPosition() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            await createVariant(formData);
            setIsOpen(false);
            e.currentTarget.reset();
        } catch (err) {
            setError("Сталася помилка. Спробуйте ще раз.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className={styles.addButton}
                onClick={() => setIsOpen(true)}
            >
                Додати позицію
            </button>

            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className={styles.header}>Додати позицію</div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input name="name" placeholder="Назва" className={styles.input} required />
                            <input name="color" placeholder="Колір" className={styles.input} />
                            <input name="size" placeholder="Розмір" className={styles.input} />
                            <input name="manufactureTime" placeholder="Час виробництва" className={styles.input} />
                            <input name="ItemID" placeholder="Ітем айді" className={styles.input} />

                            {error && <div className={styles.error}>{error}</div>}

                            <div className={styles.buttons}>
                                <button
                                    type="button"
                                    className={styles.btn}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Закрити
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`${styles.btn} ${styles.primary}`}
                                >
                                    {loading ? "Збереження..." : "Зберегти"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddPosition;
