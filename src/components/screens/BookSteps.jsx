import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { T } from "../../theme.js";
import { SERVICES, TIME_SLOTS } from "../../data.js";
import { listItem, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";
import CountUp from "../shared/CountUp.jsx";

function StepProgress({ current }) {
  const steps = ["Servicio", "Horario", "Confirmar"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
    >
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.08 + i * 0.08 }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: done || active ? T.primary : "#E7E4DB",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {done ? (
                  <Check size={13} strokeWidth={3.5} />
                ) : (
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 700, color: active ? "#fff" : "#A8A49A" }}>
                    {i + 1}
                  </span>
                )}
                {active && <span className="anim-ring" style={{ position: "absolute", inset: -4, borderRadius: 999, background: "transparent" }} />}
              </motion.span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9.5, fontWeight: 600, color: active ? T.primary : done ? T.inkSoft : "#A8A49A", transition: `color ${T.tBase}` }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: T.line, margin: "0 6px 17px", overflow: "hidden", minWidth: 12 }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.12 + i * 0.1 }}
                  style={{ transformOrigin: "left", height: "100%", background: T.primary }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}

export function BookStepService({ onBack, onSelect }) {
  const [selected, setSelected] = useState(null);
  const picking = useRef(false);

  const handleSelect = (s) => {
    if (picking.current) return;
    picking.current = true;
    setSelected(s.id);
    setTimeout(() => {
      onSelect(s);
      picking.current = false;
    }, 240);
  };

  return (
    <>
      <BackRow onBack={onBack} title="Elegí tu servicio" sub="Elegí y confirmá en menos de un minuto" />
      <StepProgress current={0} />
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SERVICES.map((s) => {
          const isSel = selected === s.id;
          return (
            <motion.div key={s.id} variants={listItem}>
              <Pressable
                onPress={() => handleSelect(s)}
                lift={3}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  borderRadius: 18,
                  padding: 14,
                  background: isSel ? "#F0F8F5" : T.surface,
                  border: isSel ? `1.5px solid ${T.primary}` : `1px solid ${T.line}`,
                  transition: `background ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                }}
              >
                <motion.div
                  animate={isSel ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isSel ? T.primary : T.accentSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <s.icon size={20} color={isSel ? "#fff" : T.accentDark} />
                </motion.div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13.5, color: T.ink }}>{s.name}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: T.inkSoft, marginTop: 1 }}>{s.desc} · {s.mins} min</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: T.primary }}>
                    $<CountUp value={s.price} duration={500} />
                  </span>
                  {isSel && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={SPRING_SNAPPY}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        background: T.primary,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={11} strokeWidth={3.5} />
                    </motion.span>
                  )}
                </div>
              </Pressable>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export function BookStepTime({ service, onBack, onSelect }) {
  const [selected, setSelected] = useState(null);
  const picking = useRef(false);

  const handleSelect = (t) => {
    if (picking.current) return;
    picking.current = true;
    setSelected(t);
    setTimeout(() => {
      onSelect(t);
      picking.current = false;
    }, 240);
  };

  return (
    <>
      <BackRow onBack={onBack} title="Elegí un horario" sub={service?.name} />
      <StepProgress current={1} />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.045 } } }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 }}
      >
        {TIME_SLOTS.map((t) => {
          const isSel = selected === t;
          return (
            <motion.div key={t} variants={listItem}>
              <Pressable
                onPress={() => handleSelect(t)}
                lift={3}
                style={{
                  width: "100%",
                  padding: "14px 6px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: 13,
                  background: isSel ? T.primary : T.surface,
                  border: isSel ? `1.5px solid ${T.primary}` : `1px solid ${T.line}`,
                  transition: `background ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 13, color: isSel ? "#fff" : T.ink, transition: `color ${T.tBase}` }}>
                  {t}
                </span>
              </Pressable>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export function BookStepConfirm({ service, time, vehicle, setVehicle, onBack, onConfirm, loading }) {
  const [focused, setFocused] = useState(false);
  const total = Math.round(service?.price * 0.85);

  return (
    <>
      <BackRow onBack={onBack} title="Confirmá tu reserva" sub={`${service?.name} · ${time}`} />
      <StepProgress current={2} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} style={card}>
        <Row label="Servicio" value={service?.name} />
        <Row label="Horario" value={time} />
        <Row label="Duración" value={`${service?.mins} min`} />
        <div style={{ height: 1, background: T.line, margin: "10px 0" }} />
        <label
          htmlFor="vehicle"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: focused ? T.primary : T.inkSoft,
            fontWeight: 600,
            letterSpacing: 0.4,
            transition: `color ${T.tBase}`,
          }}
        >
          VEHÍCULO
        </label>
        <motion.input
          id="vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{
            borderColor: focused ? T.primary : T.line,
            boxShadow: focused ? `0 0 0 3.5px ${T.primarySoft}` : "0 0 0 0px rgba(220,234,230,0)",
          }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            width: "100%",
            marginTop: 7,
            padding: "11px 12px",
            borderRadius: 10,
            border: "1px solid",
            background: T.surface,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: T.ink,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 13, borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: T.ink }}>Total (con desc. Oro)</span>
          <motion.span
            key={total}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, fontWeight: 700, color: T.primary }}
          >
            $<CountUp value={total} />
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.08 }}
      >
        <RippleButton
          onPress={onConfirm}
          disabled={loading}
          className="press-cta"
          style={{
            ...primaryBtn,
            opacity: loading ? 0.75 : 1,
            marginTop: 18,
            gap: 8,
            boxShadow: "0 14px 28px -14px rgba(14,75,67,0.7)",
          }}
        >
          {loading ? (
            <>
              <span className="anim-spin" style={{ width: 15, height: 15, borderRadius: 999, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", flexShrink: 0 }} />
              Confirmando…
            </>
          ) : (
            <>
              Confirmar reserva <ArrowRight size={15} />
            </>
          )}
        </RippleButton>
      </motion.div>
    </>
  );
}
