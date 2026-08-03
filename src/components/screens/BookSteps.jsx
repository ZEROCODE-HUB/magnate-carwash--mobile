import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock3, Plus, CheckCircle2, Minus, Sparkles } from "lucide-react";
import { T } from "../../theme.js";
import { SERVICES, TIME_SLOTS, computeTotal } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";
import CountUp from "../shared/CountUp.jsx";
import { useToast } from "../shared/Toast.jsx";

// ─────────────────────────────────────────────────────────────
// Barra de progreso de pasos — cálida y con vida
// ─────────────────────────────────────────────────────────────
function StepProgress({ current, total = 4 }) {
  const steps = ["Servicio", "Extras", "Horario", "Confirmar"];
  const pct = Math.round(((current + 1) / total) * 100);
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

// ─────────────────────────────────────────────────────────────
// Paso 1 — Descubrimiento de producto: tarjetas hero grandes
// ─────────────────────────────────────────────────────────────
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
    }, 320);
  };

  return (
    <>
      <BackRow onBack={onBack} title="Elegí tu servicio" sub="Cada uno es una experiencia completa. Deslizá y explorá." />
      <StepProgress current={0} />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        {SERVICES.map((s) => {
          const isSel = selected === s.id;
          const [g0, g1, g2] = s.gradient;
          return (
            <motion.div key={s.id} variants={itemVariants}>
              <Pressable
                onPress={() => handleSelect(s)}
                lift={5}
                tapScale={0.985}
                style={{
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: T.rXl,
                  overflow: "hidden",
                  background: T.surface,
                  border: isSel ? `1.5px solid ${T.primary}` : `1px solid ${T.line}`,
                  boxShadow: isSel ? `0 26px 60px -22px ${T.primary}` : T.shadowCard,
                  transition: `box-shadow ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                  position: "relative",
                }}
              >
                {/* Héroe visual */}
                <div
                  className="sheen"
                  style={{
                    position: "relative",
                    height: 150,
                    background: `linear-gradient(150deg, ${g0} 0%, ${g1} 55%, ${g2} 100%)`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "16px 20px",
                  }}
                >
                  <div style={{ position: "absolute", top: -40, right: -26, width: 150, height: 150, borderRadius: 999, background: `radial-gradient(circle, ${s.glow}, transparent 68%)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: -70, left: -30, width: 160, height: 160, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)", pointerEvents: "none" }} />

                  <motion.span
                    animate={isSel ? { y: [0, -5, 0], rotate: [0, -6, 6, 0] } : { y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: 26,
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      backdropFilter: "blur(6px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 18px 40px -18px rgba(0,0,0,0.5)",
                      position: "relative",
                    }}
                  >
                    <s.icon size={34} color="#fff" strokeWidth={1.9} />
                    <motion.span
                      initial={false}
                      animate={isSel ? { scale: 1 } : { scale: 0 }}
                      transition={SPRING_SNAPPY}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        background: T.gradAccent,
                        color: T.onAccent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 18px -6px rgba(0,0,0,0.45)",
                      }}
                    >
                      <Check size={16} strokeWidth={3.5} />
                    </motion.span>
                  </motion.span>
                </div>

                {/* Contenido */}
                <div style={{ padding: "16px 18px 17px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                    <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 20, color: T.ink, letterSpacing: -0.4 }}>{s.name}</div>
                    <div style={{ fontFamily: T.fontMono, fontSize: 16, fontWeight: 600, color: T.primary, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                      $<CountUp value={s.price} duration={500} />
                    </div>
                  </div>
                  <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft, marginTop: 3, fontStyle: "italic" }}>{s.tagline}</div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 13 }}>
                    {s.features.slice(0, 3).map((f) => (
                      <span
                        key={f.label}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontFamily: T.fontBody,
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: T.ink,
                          background: T.bgSunken,
                          padding: "5px 10px",
                          borderRadius: 999,
                        }}
                      >
                        <f.icon size={11} color={T.primary} />
                        {f.label}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.fontMono, fontSize: 10.5, color: T.inkFaint, letterSpacing: 0.4 }}>
                      <Clock3 size={12} /> {s.mins} MIN APROX
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ x: isSel ? 3 : 0 }}
                      transition={SPRING_SNAPPY}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: T.fontBody,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: T.primary,
                      }}
                    >
                      Configurar <ArrowRight size={15} />
                    </motion.span>
                  </div>
                </div>
              </Pressable>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Paso 2 — Configuración del servicio: extras interactivos
// ─────────────────────────────────────────────────────────────
function TotalSummary({ service, addonIds, config }) {
  const { base, addons, total } = computeTotal(service, addonIds);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        ...card,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 16,
        background: "linear-gradient(150deg, #2A1C13 0%, #1B110B 62%, #231024 100%)",
        border: "1px solid rgba(246,190,92,0.26)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          {config.length === 0 ? "Tu configuración" : `${config.length} extra${config.length === 1 ? "" : "s"}`}
        </div>
        <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16, color: "#fff", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {service.name}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <motion.div
          key={total}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING_SNAPPY}
          style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 22, color: T.accentBright, fontVariantNumeric: "tabular-nums" }}
        >
          $<CountUp value={total} />
        </motion.div>
        {addons > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: T.fontMono, fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 0.4 }}
          >
            BASE $<CountUp value={base} /> · +$<CountUp value={addons} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function BookStepConfigure({ service, addonIds, onToggleAddon, onBack, onConfirm, total }) {
  const toast = useToast();

  const toggle = (addon) => {
    const adding = !addonIds.includes(addon.id);
    onToggleAddon(addon.id);
    if (adding) {
      toast(`"${addon.name}" agregado`, "success");
    } else {
      toast(`"${addon.name}" quitado`, "info");
    }
  };

  return (
    <>
      <BackRow onBack={onBack} title="Hacelo tuyo" sub={`Sumá extras a tu ${service?.name}`} />
      <StepProgress current={1} />

      <TotalSummary service={service} addonIds={addonIds} config={addonIds} />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        style={{ display: "flex", flexDirection: "column", gap: 11 }}
      >
        {service?.addons?.map((a) => {
          const isOn = addonIds.includes(a.id);
          return (
            <motion.div key={a.id} variants={itemVariants}>
              <Pressable
                onPress={() => toggle(a)}
                lift={3}
                style={{
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  borderRadius: T.rLg,
                  padding: 15,
                  background: isOn ? "linear-gradient(135deg, #F7EBF2 0%, #F3E2EC 100%)" : T.gradCard,
                  border: isOn ? `1.5px solid ${T.primary}` : `1px solid ${T.line}`,
                  boxShadow: isOn ? `0 12px 26px -14px ${T.primary}` : T.shadowXs,
                  transition: `background ${T.tBase} ${T.easeOut}, border-color ${T.tBase} ${T.easeOut}`,
                }}
              >
                <motion.div
                  animate={isOn ? { scale: [1, 1.14, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 18,
                    background: isOn ? T.primary : T.accentSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isOn ? `0 8px 16px -6px ${T.primary}` : "none",
                  }}
                >
                  <a.icon size={22} color={isOn ? "#fff" : T.accentDark} />
                </motion.div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: 14, color: T.ink }}>{a.name}</span>
                    {isOn && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={SPRING_SNAPPY}
                        style={{
                          width: 17,
                          height: 17,
                          borderRadius: 999,
                          background: T.success,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3.5} />
                      </motion.span>
                    )}
                  </div>
                  <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: T.inkSoft, marginTop: 2, lineHeight: 1.4 }}>{a.desc}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <motion.span
                    key={isOn ? "on" : "off"}
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING_SNAPPY}
                    style={{
                      fontFamily: T.fontMono,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: isOn ? T.primary : T.ink,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    +$<CountUp value={a.price} duration={300} />
                  </motion.span>
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING_SNAPPY}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: isOn ? T.primary : T.bgSunken,
                      color: isOn ? "#fff" : T.inkSoft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isOn ? <Minus size={14} strokeWidth={2.6} /> : <Plus size={14} strokeWidth={2.6} />}
                  </motion.span>
                </div>
              </Pressable>
            </motion.div>
          );
        })}

        {service?.addons?.length === 0 && (
          <div style={{ ...card, textAlign: "center", padding: "26px 18px" }}>
            <CheckCircle2 size={22} color={T.success} style={{ margin: "0 auto 8px" }} />
            <div style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: 13, color: T.ink }}>Tu servicio ya incluye todo lo esencial</div>
            <div style={{ fontFamily: T.fontBody, fontSize: 12, color: T.inkSoft, marginTop: 3 }}>Podés continuar directo al horario.</div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.12 }}
      >
        <RippleButton
          onPress={onConfirm}
          className="press-cta"
          style={{ ...primaryBtn, marginTop: 22, gap: 9 }}
        >
          Continuar <ArrowRight size={16} />
        </RippleButton>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Paso 3 — Horario
// ─────────────────────────────────────────────────────────────
export function BookStepTime({ service, addonIds, onBack, onSelect }) {
  const [selected, setSelected] = useState(null);
  const picking = useRef(false);
  const { total } = computeTotal(service, addonIds);

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
      <BackRow onBack={onBack} title="Elegí un horario" sub={`${service?.name} · ${service?.mins} min`} />
      <StepProgress current={2} />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
      >
        {TIME_SLOTS.map((t) => {
          const isSel = selected === t;
          return (
            <motion.div key={t} variants={itemVariants}>
              <Pressable
                onPress={() => handleSelect(t)}
                lift={3}
                style={{
                  width: "100%",
                  padding: "16px 6px",
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

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.1 }}
        style={{
          ...card,
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontFamily: T.fontBody, fontSize: 12, fontWeight: 600, color: T.inkSoft }}>Total de tu pedido</div>
          <motion.div
            key={total}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 22, color: T.primary, fontVariantNumeric: "tabular-nums", marginTop: 2 }}
          >
            $<CountUp value={total} />
          </motion.div>
        </div>
        <RippleButton
          onPress={() => selected && onSelect(selected)}
          disabled={!selected}
          className="press-cta"
          style={{
            ...primaryBtn,
            width: "auto",
            padding: "13px 20px",
            gap: 8,
            opacity: selected ? 1 : 0.5,
            fontSize: 13,
            pointerEvents: selected ? "auto" : "none",
          }}
        >
          Siguiente <ArrowRight size={15} />
        </RippleButton>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Paso 4 — Confirmar: resumen completo y tranquilizador
// ─────────────────────────────────────────────────────────────
function FeatureChip({ icon: Icon, label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: T.fontBody,
        fontSize: 11,
        fontWeight: 600,
        color: T.ink,
        background: T.bgSunken,
        border: `1px solid ${T.line}`,
        padding: "6px 11px",
        borderRadius: 999,
      }}
    >
      <Icon size={12} color={T.primary} />
      {label}
    </span>
  );
}

export function BookStepConfirm({ service, addonIds, time, vehicle, setVehicle, onBack, onConfirm, loading }) {
  const [focused, setFocused] = useState(false);
  const { base, addons, total } = computeTotal(service, addonIds);
  const chosen = service?.addons?.filter((a) => addonIds.includes(a.id)) || [];

  return (
    <>
      <BackRow onBack={onBack} title="Confirmá tu reserva" sub={`${service?.name} · ${time}`} />
      <StepProgress current={3} />

      {/* Héroe compacto del servicio */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE }}
        className="sheen"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: T.rLg,
          background: `linear-gradient(140deg, ${service?.gradient[0]} 0%, ${service?.gradient[1]} 55%, ${service?.gradient[2]} 100%)`,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 13,
          boxShadow: T.shadowCard,
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -20, width: 120, height: 120, borderRadius: 999, background: `radial-gradient(circle, ${service?.glow}, transparent 68%)`, pointerEvents: "none" }} />
        <motion.span
          style={{
            width: 54,
            height: 54,
            borderRadius: 19,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <service.icon size={25} color="#fff" />
        </motion.span>
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 18, color: "#fff", letterSpacing: -0.3 }}>{service?.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: T.fontMono, fontSize: 10, color: "rgba(255,255,255,0.72)", marginTop: 3, letterSpacing: 0.4 }}>
            <Clock3 size={11} /> {service?.mins} MIN
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: EASE, delay: 0.06 }} style={{ ...card, marginBottom: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <CheckCircle2 size={15} color={T.success} />
          <span style={{ fontFamily: T.fontBody, fontSize: 11.5, fontWeight: 700, color: T.ink, letterSpacing: 0.3 }}>INCLUYE</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {service?.features.map((f) => (
            <FeatureChip key={f.label} icon={f.icon} label={f.label} />
          ))}
        </div>
      </motion.div>

      {chosen.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: EASE, delay: 0.1 }} style={{ ...card, marginBottom: 13 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <SparklesDot />
            <span style={{ fontFamily: T.fontBody, fontSize: 11.5, fontWeight: 700, color: T.ink, letterSpacing: 0.3 }}>TUS EXTRAS</span>
          </div>
          {chosen.map((a) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `1px solid ${T.line}` }}>
              <span style={{ width: 28, height: 28, borderRadius: 999, background: T.primarySoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <a.icon size={13} color={T.primary} />
              </span>
              <span style={{ flex: 1, fontFamily: T.fontBody, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{a.name}</span>
              <span style={{ fontFamily: T.fontMono, fontSize: 12, fontWeight: 600, color: T.primary, fontVariantNumeric: "tabular-nums" }}>+$<CountUp value={a.price} /></span>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: EASE, delay: 0.14 }} style={card}>
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
        <div style={{ marginTop: 15, paddingTop: 14, borderTop: `1px solid ${T.line}` }}>
          <Row label="Base (con desc. Oro)" value={`$${base.toLocaleString("es-AR")}`} divider />
          <Row label="Extras" value={addons > 0 ? `+$${addons.toLocaleString("es-AR")}` : "—"} divider />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
            <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 700, color: T.ink }}>Total</span>
            <motion.span
              key={total}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING_SNAPPY}
              style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 21, color: T.primary, fontVariantNumeric: "tabular-nums" }}
            >
              $<CountUp value={total} />
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.2 }}
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

function SparklesDot() {
  return (
    <motion.span
      animate={{ rotate: [0, -18, 14, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
      style={{ color: T.accentDark, display: "flex" }}
    >
      <Sparkles size={15} />
    </motion.span>
  );
}

