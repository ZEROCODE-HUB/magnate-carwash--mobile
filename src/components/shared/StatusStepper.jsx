import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STATUS_FLOW, STATUS_META } from "../../data.js";
import { T } from "../../theme.js";
import { EASE, SPRING_SNAPPY } from "../../motion.js";

export default function StatusStepper({ status, flow, meta }) {
  const f = flow || STATUS_FLOW;
  const m = meta || STATUS_META;
  const idx = Math.max(0, f.indexOf(status));
  const CurrentIcon = m[status]?.icon;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      {f.map((s, i) => {
        const done = i < idx;
        const current = i === idx;
        const tint = m[s]?.color || T.primary;
        const tintBg = m[s]?.bg || T.primarySoft;
        return (
          <React.Fragment key={s}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...SPRING_SNAPPY, delay: 0.08 + i * 0.05 }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: done || current ? tint : "#E8DECD",
                color: "#fff",
                position: "relative",
                zIndex: 1,
                boxShadow: done || current ? `0 4px 10px -4px ${tint}` : "none",
              }}
            >
              {done ? (
                <Check size={12} strokeWidth={3.5} />
              ) : current && CurrentIcon ? (
                <CurrentIcon size={11} strokeWidth={2.5} />
              ) : (
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "#CBBFA9" }} />
              )}
              {current && (
                <span
                  className="anim-ring"
                  style={{ position: "absolute", inset: -4, borderRadius: 999, background: "transparent" }}
                />
              )}
            </motion.span>
            {i < f.length - 1 && (
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: T.line, overflow: "hidden", minWidth: 6 }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < idx ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.06 }}
                  style={{ transformOrigin: "left", height: "100%", background: tint }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
