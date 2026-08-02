import React from "react";

export default function Pill({ children, bg, color, style, dot }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4.5px 11px",
        borderRadius: 999,
        background: bg,
        color,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)",
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
