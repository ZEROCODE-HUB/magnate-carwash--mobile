import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Plus, ChevronLeft } from "lucide-react";
import { T } from "../../theme.js";
import { MENU_CATEGORY_META } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";
import { Skeleton } from "../shared/Skeleton.jsx";
import { fetchMenu } from "../../api/orders.js";
import imgRestaurant from "../../imagenes/restaurante/restaurante-1.jpeg";
import imgCafe from "../../imagenes/cafe/cafe-1.jpeg";
import imgKiosco from "../../imagenes/restaurante/restaurante-2.jpeg";
import imgCarwash from "../../imagenes/carwash/carwash-1.jpeg";

const CATEGORY_IMAGES = {
  restaurant: imgRestaurant,
  cafeteria: imgCafe,
  kiosco: imgKiosco,
  carwash: imgCarwash,
};

export default function MenuScreen({ categoria, onBack, onPickItem, cartCount, onGoToCart }) {
  const meta = MENU_CATEGORY_META[categoria] || {};
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMenu = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchMenu(categoria)
      .then((data) => setItems(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [categoria]);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  return (
    <>
      {/* Hero sticky con imagen de fondo */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          marginBottom: 18,
          height: 150,
          borderRadius: T.rXl,
          overflow: "hidden",
          backgroundImage: `url(${CATEGORY_IMAGES[categoria] || imgRestaurant})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: T.shadowLift,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 16,
        }}
      >
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.88 }}
          transition={SPRING_SNAPPY}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 38,
            height: 38,
            borderRadius: 999,
            background: "rgba(255,255,255,0.92)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: T.shadowXs,
            cursor: "pointer",
            zIndex: 2,
          }}
          aria-label="Volver"
        >
          <ChevronLeft size={19} color={T.ink} />
        </motion.button>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, color: "#fff" }}>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 24, color: "#fff", letterSpacing: -0.5, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            {meta.name || categoria}
          </div>
          <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: "rgba(255,255,255,0.85)", marginTop: 2, lineHeight: 1.4 }}>
            {meta.tagline || "Elegí lo que más te apetece"}
          </div>
        </div>
      </div>

      {/* Carrito flotante */}
      <div
        style={{
          position: "fixed",
          bottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
          right: 18,
          zIndex: 20,
          display: cartCount > 0 ? "flex" : "none",
          alignItems: "center",
          gap: 8,
          padding: "10px 15px",
          borderRadius: T.rPill,
          background: T.primary,
          color: "#fff",
          fontFamily: T.fontBody,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: T.shadowBtn,
          cursor: "pointer",
        }}
        onClick={onGoToCart}
      >
        <ShoppingCart size={16} /> Carrito ({cartCount})
      </div>

      {!loading && error && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ ...card, textAlign: "center", padding: "38px 18px" }}>
          <span style={{ display: "inline-flex", width: 56, height: 56, borderRadius: 999, background: T.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Plus size={26} color={T.primary} />
          </span>
          <div style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: 15, color: T.ink }}>No se pudo cargar el menú</div>
          <div style={{ fontFamily: T.fontBody, fontSize: 12, color: T.inkSoft, marginTop: 3, lineHeight: 1.4 }}>
            Verificá que el servidor esté activo y volvé a intentar.
          </div>
          <RippleButton onPress={loadMenu} className="press-cta" style={{ ...primaryBtn, marginTop: 16, width: "auto", padding: "13px 26px", gap: 8 }}>
            Reintentar <ArrowRight size={15} />
          </RippleButton>
        </motion.div>
      )}

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={150} radius={20} />
          ))}
        </div>
      )}

      {!loading && items && items.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ ...card, textAlign: "center", padding: "38px 18px" }}>
          <Plus size={32} color={T.inkFaint} style={{ marginBottom: 8 }} />
          <div style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: 15, color: T.ink }}>No hay productos en esta categoría</div>
        </motion.div>
      )}

      {!loading && items && items.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 100 }}
        >
          {items.map((it) => (
            <motion.div key={it.id} variants={itemVariants}>
              <Pressable
                onPress={() => onPickItem(it)}
                lift={4}
                tapScale={0.985}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: T.rXl,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: T.shadowCard,
                    height: 200,
                  }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${CATEGORY_IMAGES[categoria] || imgRestaurant})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.45)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
                  }}
                />

                <div style={{ position: "relative", zIndex: 2, padding: 18, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ marginBottom: "auto" }}>
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: T.fontMono,
                        fontSize: 10,
                        fontWeight: 700,
                        color: T.accentBright,
                        background: "rgba(246,190,92,0.2)",
                        padding: "4px 10px",
                        borderRadius: 999,
                        letterSpacing: 0.4,
                      }}
                    >
                      <Plus size={10} /> AGREGAR
                    </motion.span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 18, color: "#fff", letterSpacing: -0.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{it.name}</div>
                      <div style={{ fontFamily: T.fontBody, fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 3, lineHeight: 1.4, maxWidth: "70%" }}>
                        {it.description}
                      </div>
                    </div>
                    <motion.div
                      key={it.price}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={SPRING_SNAPPY}
                      style={{ fontFamily: T.fontMono, fontSize: 20, fontWeight: 700, color: T.accentBright, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}
                    >
                      ${it.price.toLocaleString("es-AR")}
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={SPRING_SNAPPY}
                    style={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.92)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: T.shadowMd,
                      opacity: 0.9,
                    }}
                  >
                    <Plus size={20} color={T.primary} strokeWidth={2.4} />
                  </motion.div>
                </div>
              </Pressable>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
