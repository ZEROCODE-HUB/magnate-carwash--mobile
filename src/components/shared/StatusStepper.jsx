import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STATUS_FLOW, STATUS_META } from "../../data.js";
import { T } from "../../theme.js";
import { EASE, SPRING_SNAPPY } from "../../motion.js";

export default function StatusStepper({ status }) {
  const idx = Math.max(0, STATUS_FLOW.indexOf(status));
  const CurrentIcon = STATUS_META[status]?.icon;

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      {STATUS_FLOW.map((s, i) => {
        const done = i < idx;
        const current = i === idx;
        return (
          <React.Fragment key={s}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...SPRING_SNAPPY, delay: 0.08 + i * 0.05 }}
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: done || current ? T.primary : "#E7E4DB",
                color: "#fff",
                position: "relative",
                zIndex: 1,
              }}
            >
              {done ? (
                <Check size={11} strokeWidth={3.5} />
              ) : current && CurrentIcon ? (
                <CurrentIcon size={10} strokeWidth={2.5} />
              ) : (
                <span style={{ width: 4.5, height: 4.5, borderRadius: 999, background: "#C9C5B9" }} />
              )}
              {current && (
                <span
                  className="anim-ring"
                  style={{ position: "absolute", inset: -4, borderRadius: 999, background: "transparent" }}
                />
              )}
            </motion.span>
            {i < STATUS_FLOW.length - 1 && (
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: T.line, overflow: "hidden", minWidth: 6 }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < idx ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.06 }}
                  style={{ transformOrigin: "left", height: "100%", background: T.primary }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
