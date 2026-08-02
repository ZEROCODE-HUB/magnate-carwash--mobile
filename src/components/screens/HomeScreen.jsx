import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Radio, Crown, ArrowRight, Sparkles } from "lucide-react";
import { T } from "../../theme.js";
import { CATEGORIES, STATUS_META, STATUS_FLOW } from "../../data.js";
import { itemVariants, EASE, SPRING_SNAPPY } from "../../motion.js";
import Pressable from "../shared/Pressable.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import { ScreenSkeleton } from "../shared/Skeleton.jsx";

function LiveReservationCard({ reservation, onViewRes }) {
  const meta = STATUS_META[reservation.status];
  const Icon = meta.icon;
  const idx = STATUS_FLOW.indexOf(reservation.status);
  const progress = Math.round(((idx + 1) / STATUS_FLOW.length) * 100);
  const svc = reservation.service;

  return (
    <motion.div variants={itemVariants}>
      <Pressable
        onPress={onViewRes}
        lift={3}
        style={{
          width: "100%",
          textAlign: "left",
          borderRadius: T.rXl,
          padding: 18,
          background: T.gradHero,
          color: "white",
          border: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 44px -20px rgba(62,21,43,0.7)",
        }}
      >
        <div style={{ position: "absolute", top: -44, right: -34, width: 150, height: 150, borderRadius: 999, background: "radial-gradient(circle, rgba(246,190,92,0.3), transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -56, left: -36, width: 140, height: 140, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: meta.bg,
              color: meta.color,
              fontFamily: T.fontMono,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            <Radio size={10} /> {reservation.status.toUpperCase()}
          </span>
          <motion.span
            whileHover={{ x: 3 }}
            transition={SPRING_SNAPPY}
            style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.88)", fontSize: 12, fontFamily: T.fontBody, fontWeight: 600 }}
          >
            Ver seguimiento <ChevronRight size={16} />
          </motion.span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 13, marginTop: 14, position: "relative" }}>
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Icon size={20} color={meta.color} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 17.5, letterSpacing: -0.3 }}>{svc}</div>
            <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: "rgba(255,255,255,0.68)", marginTop: 2 }}>
              {reservation.time} · {reservation.vehicle}
            </div>
          </div>
          <motion.div
            key={progress}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ textAlign: "right" }}
          >
            <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 19, color: T.accentBright }}>{progress}%</div>
            <div style={{ fontFamily: T.fontMono, fontSize: 8.5, color: "rgba(255,255,255,0.55)", letterSpacing: 0.8 }}>COMPLETADO</div>
          </motion.div>
        </div>

        <div style={{ marginTop: 15, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.14)", overflow: "hidden", position: "relative" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            style={{
              height: "100%",
              borderRadius: 999,
              background: T.gradAccent,
              boxShadow: "0 0 14px rgba(246,190,92,0.7)",
            }}
          />
        </div>
      </Pressable>
    </motion.div>
  );
}

export default function HomeScreen({ onPickCarwash, myReservation, onViewRes, bootLoading }) {
  if (bootLoading) {
    return <ScreenSkeleton lines={3} />;
  }

  return (
    <>
      {myReservation && <LiveReservationCard reservation={myReservation} onViewRes={onViewRes} />}

      <SectionTitle sub="Todo lo de Magnate en un solo lugar" accent="hoy" style={myReservation ? { marginTop: 22 } : undefined}>
        ¿Qué querés hacer
      </SectionTitle>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}
      >
        {CATEGORIES.map((c) => {
          const live = c.live;
          return (
            <motion.div key={c.id} variants={itemVariants}>
              <Pressable
                onPress={live ? onPickCarwash : undefined}
                lift={live ? 4 : 0}
                tapScale={live ? 0.97 : 1}
                style={{
                  ...(!live && { pointerEvents: "none" }),
                  width: "100%",
                  textAlign: "left",
                  background: live ? T.gradCard : "#F0E9DC",
                  border: `1px solid ${T.line}`,
                  borderRadius: T.rLg,
                  padding: 15,
                  cursor: live ? "pointer" : "default",
                  opacity: live ? 1 : 0.6,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "flex-start",
                  boxShadow: live ? T.shadowCard : "none",
                }}
              >
                <motion.div
                  whileHover={live ? { scale: 1.1, rotate: -5 } : undefined}
                  whileTap={live ? { scale: 0.9 } : undefined}
                  transition={SPRING_SNAPPY}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    background: live ? T.primarySoft : "#E5DCCB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <c.icon size={21} color={live ? T.primary : T.inkFaint} />
                </motion.div>
                <div>
                  <div style={{ fontFamily: T.fontBody, fontWeight: 700, fontSize: 14, color: T.ink }}>{c.name}</div>
                </div>
                {live ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: T.fontMono,
                      fontSize: 10,
                      color: T.primary,
                      fontWeight: 600,
                      letterSpacing: 0.3,
                      background: T.primarySofter,
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    Reservar <ArrowRight size={11} />
                  </span>
                ) : (
                  <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkFaint, letterSpacing: 0.3 }}>PRÓXIMAMENTE</span>
                )}
              </Pressable>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Pressable
          lift={2}
          style={{
            marginTop: 16,
            width: "100%",
            textAlign: "left",
            borderRadius: T.rXl,
            padding: 18,
            background: "linear-gradient(150deg, #2A1C13 0%, #1B110B 62%, #231024 100%)",
            border: "1px solid rgba(246,190,92,0.28)",
            color: "white",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 18px 40px -22px rgba(0,0,0,0.7)",
          }}
        >
          <div className="sheen" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
            <motion.span
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                background: "rgba(246,190,92,0.16)",
                border: "1px solid rgba(246,190,92,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Crown size={19} color={T.accentBright} />
            </motion.span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: -0.2 }}>Nivel Oro</div>
              <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: "rgba(255,255,255,0.68)", marginTop: 2, lineHeight: 1.45 }}>
                Siempre un 15% menos en tus lavados + un premium de regalo.
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, ...SPRING_SNAPPY }}
              style={{
                fontFamily: T.fontMono,
                fontSize: 10,
                fontWeight: 600,
                color: T.onAccent,
                background: T.gradAccent,
                padding: "5px 10px",
                borderRadius: 999,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              −15% OFF
            </motion.div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 13, position: "relative" }}>
            {["15% OFF en lavados", "1 premium al mes", "Prioridad"].map((b) => (
              <span
                key={b}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: T.fontBody,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "4px 9px",
                  borderRadius: 999,
                }}
              >
                <Sparkles size={10} color={T.accentBright} /> {b}
              </span>
            ))}
          </div>
        </Pressable>
      </motion.div>
    </>
  );
}
