'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/ConsentBanner.module.scss';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('consent');
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (granted: boolean) => {
    localStorage.setItem('consent', granted ? 'granted' : 'denied');
    setVisible(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
      });
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Ми використовуємо файли cookie для аналітики та реклами. Ви згодні?
      </p>
      <div className={styles.buttons}>
        <button
          onClick={() => handleConsent(true)}
          className={styles.btnYes}
        >
          Так
        </button>
        <button
          onClick={() => handleConsent(false)}
          className={styles.btnNo}
        >
          Ні
        </button>
      </div>
    </div>
  );
}
