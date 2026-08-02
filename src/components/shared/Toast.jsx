import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertTriangle } from "lucide-react";
import { EASE } from "../../motion.js";

const ToastContext = createContext(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const ICONS = {
  success: { icon: Check, color: "#1B7A3D", bg: "#DEF3E3" },
  info: { icon: Info, color: "#0E4B43", bg: "#DCEAE6" },
  error: { icon: AlertTriangle, color: "#E1573F", bg: "#FBE1DB" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "success", opts = {}) => {
      const id = ++idRef.current;
      setToasts((t) => [...t.slice(-2), { id, message, type }]);
      setTimeout(() => dismiss(id), opts.duration ?? 2600);
    },
    [dismiss]
  );

  const toast = useCallback(
    (message, type = "success", opts) => push(message, type, opts),
    [push]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toasts, dismiss }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "calc(78px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
        zIndex: 40,
        padding: "0 20px",
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const meta = ICONS[t.type];
          const Icon = meta.icon;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "11px 16px 11px 11px",
                boxShadow: "0 14px 34px -14px rgba(10,51,45,0.4)",
                border: "1px solid #E2DED2",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: meta.bg,
                  color: meta.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#16221F", fontFamily: "Inter, sans-serif" }}>
                {t.message}
              </span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar"
                style={{
                  marginLeft: 6,
                  color: "#5B6864",
                  fontSize: 14,
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: 2,
                }}
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
