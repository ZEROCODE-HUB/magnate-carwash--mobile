import React from "react";
import { T } from "../../theme.js";

export default function Pill({ children, bg, color, style, dot }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 999,
        background: bg,
        color,
        fontFamily: T.fontMono,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: 0.4,
        whiteSpace: "nowrap",
        boxShadow: "inset 0 0 0 1px rgba(36,24,16,0.04)",
        ...style,
      }}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: 999, background: color, opacity: 0.9, flexShrink: 0 }} />
      )}
      {children}
    </span>
  );
}
