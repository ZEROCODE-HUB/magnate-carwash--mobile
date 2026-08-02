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
  const pct = Math.round(((current + 1) / steps.length) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ marginBottom: 22 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
        <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkFaint, letterSpacing: 1.2 }}>
          PASO {current + 1} DE {steps.length}
        </span>
        <motion.span
          key={pct}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING_SNAPPY}
          style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 14, color: T.primary }}
        >
          {pct}%
        </motion.span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <motion.div
              key={label}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...SPRING_SNAPPY, delay: 0.12 + i * 0.08 }}
              style={{
                flex: 1,
                height: 46,
                borderRadius: T.rMd,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                background: done ? `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDark} 100%)` : active ? T.primarySoft : "#F0E9DC",
                boxShadow: done ? `0 8px 18px -8px ${T.primary}` : "none",
                position: "relative",
              }}
            >
              {done ? (
                <Check size={13} strokeWidth={3.5} color="#fff" />
              ) : (
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: active ? "#fff" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: T.fontMono,
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: active ? T.primary : T.inkFaint,
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span
                style={{
                  fontFamily: T.fontBody,
                  fontSize: 11,
                  fontWeight: 700,
                  color: done ? "#fff" : active ? T.primary : T.inkFaint,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
              {active && <span className="anim-ring" style={{ position: "absolute", inset: -3, borderRadius: T.rMd, background: "transparent" }} />}
            </motion.div>
          );
        })}
      </div>
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
    }, 260);
  };

  return (
    <>
      <BackRow onBack={onBack} title="Elegí tu servicio" sub="Listo en menos de un minuto" />
      <StepProgress current={0} />
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {SERVICES.map((s) => {
          const isSel = selected === s.id;
          return (
            <motion.div key={s.id} variants={listItem}>
              <Pressable
                onPress={() => handleSelect(s)}
                lift={4}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  cursor: "pointer",
                  borderRadius: T.rLg,
                  padding: 16,
                  background: isSel ? "linear-gradient(135deg, #F7EBF2 0%, #F3E2EC 100%)" : T.gradCard,
                  border: isSel ? `1.5px solid ${T.primary}` : `1px solid ${T.line}`,
                  boxShadow: isSel ? T.shadowCard : T.shadowXs,
                  transition: `background ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                }}
              >
                <motion.div
                  animate={isSel ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 17,
                    background: isSel ? T.primary : T.accentSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isSel ? `0 6px 14px -6px ${T.primary}` : "none",
                  }}
                >
                  <s.icon size={21} color={isSel ? "#fff" : T.accentDark} />
                </motion.div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16, color: T.ink, letterSpacing: -0.2 }}>{s.name}</div>
                  <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: T.inkSoft, marginTop: 2 }}>{s.desc} · {s.mins} min</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                  <span style={{ fontFamily: T.fontMono, fontSize: 13.5, fontWeight: 600, color: T.primary, fontVariantNumeric: "tabular-nums" }}>
                    $<CountUp value={s.price} duration={500} />
                  </span>
                  {isSel && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={SPRING_SNAPPY}
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: 999,
                        background: T.primary,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={12} strokeWidth={3.5} />
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
    }, 260);
  };

  return (
    <>
      <BackRow onBack={onBack} title="Elegí un horario" sub={service?.name} />
      <StepProgress current={1} />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
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
                  padding: "15px 6px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: T.rMd,
                  background: isSel ? `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDark} 100%)` : T.gradCard,
                  border: isSel ? "none" : `1px solid ${T.line}`,
                  boxShadow: isSel ? T.shadowBtn : T.shadowXs,
                  transition: `background ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                }}
              >
                <span
                  style={{
                    fontFamily: T.fontMono,
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: isSel ? "#fff" : T.ink,
                    fontVariantNumeric: "tabular-nums",
                    transition: `color ${T.tBase}`,
                  }}
                >
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
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: EASE }} style={card}>
        <Row label="Servicio" value={service?.name} strong />
        <Row label="Horario" value={time} divider />
        <Row label="Duración" value={`${service?.mins} min`} />
        <div style={{ height: 1, background: T.line, margin: "12px 0" }} />
        <label
          htmlFor="vehicle"
          style={{
            fontFamily: T.fontMono,
            fontSize: 10,
            color: focused ? T.primary : T.inkFaint,
            fontWeight: 600,
            letterSpacing: 1.2,
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
            boxShadow: focused ? `0 0 0 4px ${T.primarySoft}` : "0 0 0 0px rgba(243,226,236,0)",
          }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "12px 14px",
            borderRadius: T.rSm,
            border: "1px solid",
            background: T.surface,
            fontFamily: T.fontBody,
            fontSize: 13.5,
            color: T.ink,
            outline: "none",
            boxSizing: "border-box",
            transition: `background ${T.tBase}`,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingTop: 14, borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 700, color: T.ink }}>Total (con desc. Oro)</span>
          <motion.span
            key={total}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 20, color: T.primary, fontVariantNumeric: "tabular-nums" }}
          >
            $<CountUp value={total} />
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.1 }}
      >
        <RippleButton
          onPress={onConfirm}
          disabled={loading}
          className="press-cta"
          style={{ ...primaryBtn, opacity: loading ? 0.75 : 1, marginTop: 20, gap: 9 }}
        >
          {loading ? (
            <>
              <span className="anim-spin" style={{ width: 15, height: 15, borderRadius: 999, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", flexShrink: 0 }} />
              Confirmando…
            </>
          ) : (
            <>
              Confirmar reserva <ArrowRight size={16} />
            </>
          )}
        </RippleButton>
      </motion.div>
    </>
  );
}
