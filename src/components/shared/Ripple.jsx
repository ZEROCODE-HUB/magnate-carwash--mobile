import React, { useState } from "react";

// Efecto de onda (ripple) estilo Material sobre botones primarios.
// Se dispara en cada toque/clic y se limpia solo.
function RippleInk({ x, y, size, color }) {
  return (
    <span
      className="ripple-ink"
      style={{ left: x - size / 2, top: y - size / 2, width: size, height: size, background: color }}
    />
  );
}

export default function RippleButton({
  children,
  onPress,
  rippleColor = "rgba(255,255,255,0.5)",
  style,
  className = "",
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const spawn = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600);
  };

  return (
    <button
      type="button"
      className={`ripple-host ${className}`}
      style={style}
      onClick={(e) => {
        spawn(e);
        onPress?.(e);
      }}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <RippleInk key={r.id} x={r.x} y={r.y} size={r.size} color={rippleColor} />
      ))}
    </button>
  );
}
