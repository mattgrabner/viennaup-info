"use client";

import { useEffect, useState } from "react";
import styles from "./ConsentBanner.module.css";

const STORAGE_KEY = "viennaup-analytics-consent";

function updateGoogleConsent(choice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const granted = choice === "accepted";
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(STORAGE_KEY);
    if (savedChoice === "accepted" || savedChoice === "declined") {
      updateGoogleConsent(savedChoice);
      return;
    }
    setVisible(true);
  }, []);

  function handleChoice(choice) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    updateGoogleConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className={styles.copy}>
        <strong>Analytics</strong>
        <p>
          We use Google Analytics to understand visitor numbers and countries. Accept to enable
          analytics cookies, or continue without analytics tracking.
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={() => handleChoice("declined")}>
          Continue without analytics
        </button>
        <button type="button" className={styles.primaryButton} onClick={() => handleChoice("accepted")}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}
