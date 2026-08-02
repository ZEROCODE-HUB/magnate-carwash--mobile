import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { T } from "../../theme.js";
import { itemVariants, SPRING_SNAPPY } from "../../motion.js";

export function Row({ label, value, divider, strong }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: divider ? "8px 0" : "5px 0",
        borderBottom: divider ? `1px solid ${T.line}` : "none",
      }}
    >
      <span style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft }}>{label}</span>
      <span
        style={{
          fontFamily: T.fontBody,
          fontSize: strong ? 14.5 : 12.5,
          fontWeight: strong ? 700 : 600,
          color: strong ? T.primary : T.ink,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function BackRow({ onBack, title, sub, style }) {
  return (
    <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, ...style }}>
      <motion.button
        onClick={onBack}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.86 }}
        transition={SPRING_SNAPPY}
        aria-label="Volver"
        style={{
          width: 38,
          height: 38,
          borderRadius: T.rMd,
          background: T.surface,
          border: `1px solid ${T.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: T.shadowXs,
        }}
      >
        <ChevronLeft size={19} color={T.ink} />
      </motion.button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 21, color: T.ink, letterSpacing: -0.4, lineHeight: 1.15 }}>
          {title}
        </div>
        {sub && (
          <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: T.inkSoft, marginTop: 2, opacity: 0.85 }}>
            {sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}
