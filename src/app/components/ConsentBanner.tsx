'use client';

import { useState, useEffect } from 'react';

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
    <div className="fixed bottom-4 left-4 bg-white shadow-lg p-4 rounded-lg max-w-sm">
      <p className="text-sm mb-3">
        Ми використовуємо файли cookie для аналітики та реклами. Ви згодні?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handleConsent(true)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Так
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Ні
        </button>
      </div>
    </div>
  );
}
