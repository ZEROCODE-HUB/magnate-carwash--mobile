import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Radio, Crown, ArrowRight, Sparkles, ShoppingBag, Coffee, UtensilsCrossed } from "lucide-react";
import { T } from "../../theme.js";
import { CATEGORIES, STATUS_META, STATUS_FLOW, ORDER_STATUS_META, ORDER_STATUS_FLOW, MENU_CATEGORY_META } from "../../data.js";
import imgRestaurant from "../../imagenes/restaurante/restaurante-1.jpeg";
import imgCafe from "../../imagenes/cafe/cafe-1.jpeg";
import imgKiosco from "../../imagenes/restaurante/restaurante-2.jpeg";
import imgCarwash from "../../imagenes/carwash/carwash-1.jpeg";
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

const CATEGORY_IMAGES = {
  restaurant: imgRestaurant,
  cafeteria: imgCafe,
  kiosco: imgKiosco,
  carwash: imgCarwash,
};

function LiveOrderCard({ order, onViewOrder }) {
  const meta = ORDER_STATUS_META[order.status];
  const Icon = meta?.icon;
  const idx = ORDER_STATUS_FLOW.indexOf(order.status);
  const progress = Math.round(((idx + 1) / ORDER_STATUS_FLOW.length) * 100);
  const catMeta = MENU_CATEGORY_META[order.categoria] || {};
  const totalItems = order.items.reduce((sum, i) => sum + i.qty, 0);
  const orderTotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <motion.div variants={itemVariants}>
      <Pressable
        onPress={onViewOrder}
        lift={3}
        style={{
          width: "100%",
          textAlign: "left",
          borderRadius: T.rXl,
          padding: 16,
          background: "linear-gradient(150deg, #2A1C13 0%, #1B110B 62%, #231024 100%)",
          color: "white",
          border: "1px solid rgba(246,190,92,0.22)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 44px -20px rgba(62,21,43,0.7)",
        }}
      >
        <div style={{ position: "absolute", top: -44, right: -34, width: 150, height: 150, borderRadius: 999, background: "radial-gradient(circle, rgba(246,190,92,0.22), transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -56, left: -36, width: 140, height: 140, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: meta?.bg || "rgba(255,255,255,0.12)",
              color: meta?.color ? meta.color : "rgba(255,255,255,0.8)",
              fontFamily: T.fontMono,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            <Radio size={10} /> {order.status.toUpperCase()}
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
            <Icon size={20} color={meta?.color || T.accentBright} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: -0.3 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: catMeta.color || T.primary, flexShrink: 0 }} />
              {catMeta.name || order.categoria}
            </div>
            <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: "rgba(255,255,255,0.68)", marginTop: 2 }}>
              {totalItems} {totalItems === 1 ? "producto" : "productos"} · ${orderTotal.toLocaleString("es-AR")}
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
            <div style={{ fontFamily: T.fontMono, fontSize: 8.5, color: "rgba(255,255,255,0.55)", letterSpacing: 0.8 }}>LISTO</div>
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

export default function HomeScreen({ onPickCarwash, onPickCategory, myReservation, myOrder, onViewRes, onViewOrder, bootLoading }) {
  if (bootLoading) {
    return <ScreenSkeleton lines={3} />;
  }

  return (
      <>
        {myReservation && <LiveReservationCard reservation={myReservation} onViewRes={onViewRes} />}
        {myOrder && <LiveOrderCard order={myOrder} onViewOrder={onViewOrder} />}

        <SectionTitle sub="Todo lo de Magnate en un solo lugar" accent="hoy" style={myReservation || myOrder ? { marginTop: 22 } : undefined}>
          ¿Qué querés hacer
        </SectionTitle>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          style={{ display: "flex", flexDirection: "column", gap: 13 }}
        >
          {CATEGORIES.map((c) => {
            const live = c.live;
            const isCarwash = c.id === "carwash";
            const Icon = c.icon;
            const meta = isCarwash ? null : MENU_CATEGORY_META[c.rubro];
            return (
              <motion.div key={c.id} variants={itemVariants}>
                <Pressable
                  onPress={live ? (isCarwash ? onPickCarwash : () => onPickCategory(c.rubro)) : undefined}
                  lift={live ? 5 : 0}
                  tapScale={live ? 0.97 : 1}
                  style={{
                    ...(!live && { pointerEvents: "none" }),
                    width: "100%",
                    textAlign: "left",
                    borderRadius: T.rXl,
                    cursor: live ? "pointer" : "default",
                    opacity: live ? 1 : 0.55,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: live ? T.shadowLift : "none",
                    height: 160,
                  }}
                >
                  {!isCarwash && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${CATEGORY_IMAGES[c.rubro]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.55)",
                      }}
                    />
                  )}
                   {isCarwash && (
                     <div
                       style={{
                         position: "absolute",
                         inset: 0,
                         backgroundImage: `url(${CATEGORY_IMAGES.carwash})`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                       }}
                     />
                   )}

<div style={{ position: "relative", inset: 0, padding: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
                      <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 11px", borderRadius: 999, background: isCarwash ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", fontFamily: T.fontBody, fontSize: 10, fontWeight: 700, color: isCarwash ? "#fff" : T.ink, letterSpacing: 0.4 }}>
                          <Icon size={11} color={isCarwash ? T.accentBright : T.primary} /> {c.name.toUpperCase()}
                        </div>
                        <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 19, color: "#fff", letterSpacing: -0.4, textShadow: "0 2px 6px rgba(0,0,0,0.5)", marginTop: 6 }}>
                          {c.name}
                        </div>
                        {c.tagline && (
                          <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.4, maxWidth: "80%", textShadow: "0 1px 3px rgba(0,0,0,0.4)", marginTop: 2 }}>
                            {c.tagline}
                          </div>
                        )}
                      </div>
                    {live ? (
                      <motion.div
                        whileHover={{ x: 2 }}
                        transition={SPRING_SNAPPY}
                        style={{
                          alignSelf: "flex-start",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontFamily: T.fontMono,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: 0.3,
                          color: isCarwash ? T.onPrimary : T.primary,
                          background: isCarwash ? T.gradAccent : "rgba(255,255,255,0.92)",
                          padding: "6px 13px",
                          borderRadius: 999,
                          boxShadow: isCarwash ? T.shadowBtn : T.shadowXs,
                        }}
                      >
                        {isCarwash ? "Reservar" : "Pedir"} <ArrowRight size={11} />
                      </motion.div>
                    ) : (
                      <span style={{ fontFamily: T.fontMono, fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>PRÓXIMAMENTE</span>
                    )}
                  </div>
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
