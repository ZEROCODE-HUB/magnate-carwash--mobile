import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { T } from "../../theme.js";
import { itemVariants, SPRING_SNAPPY } from "../../motion.js";

export function Row({ label, value, divider }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: divider ? "7px 0" : "5px 0",
        borderBottom: divider ? `1px solid ${T.line}` : "none",
      }}
    >
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft }}>{label}</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600, color: T.ink, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

export function BackRow({ onBack, title, sub, style }) {
  return (
    <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14, ...style }}>
      <motion.button
        onClick={onBack}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.86 }}
        transition={SPRING_SNAPPY}
        aria-label="Volver"
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          background: T.surface,
          border: `1px solid ${T.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: "0 1px 2px rgba(22,34,31,0.04), 0 4px 12px -6px rgba(14,75,67,0.3)",
        }}
      >
        <ChevronLeft size={17} color={T.ink} />
      </motion.button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16.5, color: T.ink, letterSpacing: -0.2 }}>
          {title}
        </div>
        {sub && (
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: T.inkSoft, marginTop: 1, opacity: 0.85 }}>
            {sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}
