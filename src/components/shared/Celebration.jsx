import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING_SNAPPY, EASE } from "../../motion.js";
import { usePrefersReducedMotion } from "../../hooks.js";

const COLORS = ["#E8A93B", "#0E4B43", "#E1573F", "#2F8F7A", "#2472B8", "#7A57C2"];

// Celebración post-acción: check que se dibuja + lluvia de confeti.
// Pequeña, elegante y autodescartable (~2.6s).
export default function Celebration({ trigger, message = "Reserva confirmada" }) {
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 2600);
    return () => clearTimeout(t);
  }, [trigger]);

  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        delay: Math.random() * 0.5,
        dur: 1.7 + Math.random() * 0.9,
        size: 5 + Math.random() * 5,
        color: COLORS[i % COLORS.length],
        sway: (Math.random() - 0.5) * 140,
        tilt: 360 + Math.random() * 360,
      })),
    [trigger]
  );

  return (
    <AnimatePresence>
      {active && !reduced && (
        <motion.div
          key="celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {pieces.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 0.45,
                background: p.color,
                "--delay": `${p.delay}s`,
                "--dur": `${p.dur}s`,
                "--sway": `${p.sway}px`,
                "--tilt": `${p.tilt}deg`,
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{
              width: 104,
              height: 104,
              borderRadius: 999,
              background: "#0E4B43",
              boxShadow: "0 24px 60px -16px rgba(10,51,45,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <path
                className="celeb-check"
                d="M4.5 12.5 L9.5 17.5 L19.5 6.5"
                stroke="#E8A93B"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.3, ease: EASE }}
            style={{
              position: "absolute",
              bottom: "30%",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#16221F",
              background: "rgba(255,255,255,0.9)",
              padding: "8px 16px",
              borderRadius: 999,
              boxShadow: "0 10px 30px -10px rgba(10,51,45,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
