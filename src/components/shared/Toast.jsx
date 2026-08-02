import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertTriangle } from "lucide-react";
import { EASE } from "../../motion.js";
import { T } from "../../theme.js";

const ToastContext = createContext(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const ICONS = {
  success: { icon: Check, color: T.success, bg: T.successSoft },
  info: { icon: Info, color: T.info, bg: T.infoSoft },
  error: { icon: AlertTriangle, color: T.error, bg: T.errorSoft },
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
      setTimeout(() => dismiss(id), opts.duration ?? 2800);
    },
    [dismiss]
  );

  const toast = useCallback((message, type = "success", opts) => push(message, type, opts), [push]);

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
        bottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
        zIndex: 40,
        padding: "0 24px",
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const meta = ICONS[t.type];
          const Icon = meta.icon;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 26, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.92 }}
              transition={{ duration: 0.34, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: T.surface,
                borderRadius: T.rMd,
                padding: "12px 16px 12px 12px",
                boxShadow: T.shadowFloat,
                border: `1px solid ${T.line}`,
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: meta.bg,
                  color: meta.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={15} />
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, fontFamily: T.fontBody }}>{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar"
                style={{
                  marginLeft: 6,
                  color: T.inkFaint,
                  fontSize: 15,
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
