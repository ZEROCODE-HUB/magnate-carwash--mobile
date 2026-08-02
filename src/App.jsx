import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Car, Crown, X } from "lucide-react";
import { T } from "./theme.js";
import { TIER_META } from "./data.js";
import { screenVariants, EASE, SPRING_SNAPPY } from "./motion.js";
import EagleMark from "./components/shared/EagleMark.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import { BookStepService, BookStepTime, BookStepConfirm } from "./components/screens/BookSteps.jsx";
import MyReservation from "./components/screens/MyReservation.jsx";
import Celebration from "./components/shared/Celebration.jsx";
import { ToastProvider, useToast } from "./components/shared/Toast.jsx";
import { fetchReservations, createReservation, subscribeToReservations } from "./api/reservations.js";

const screenProps = { variants: screenVariants, initial: "initial", animate: "enter", exit: "exit", className: "screen-stage" };

function LiveBadge({ connected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 11px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(4px)",
      }}
    >
      <span
        className="live-dot"
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: connected ? "#7FD9A8" : T.coral,
        }}
      />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.9)", letterSpacing: 0.6 }}>
        {connected ? "EN VIVO" : "CONECTANDO…"}
      </span>
    </motion.div>
  );
}

function Header({ connected, name, screen }) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.42, ease: EASE }}
      style={{
        position: "relative",
        zIndex: 3,
        padding: "calc(16px + env(safe-area-inset-top, 0px)) 18px 16px",
        background: "linear-gradient(155deg, #11584E 0%, #0A332D 62%, #071F1A 100%)",
        color: "white",
        boxShadow: "0 14px 34px -20px rgba(7,31,26,0.8)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -70,
          right: -50,
          width: 190,
          height: 190,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(232,169,59,0.22), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -40,
          width: 170,
          height: 170,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <EagleMark size={22} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17.5, letterSpacing: -0.3 }}>
            Magnate
          </span>
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, ...SPRING_SNAPPY }}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              background: "rgba(232,169,59,0.22)",
              color: T.accent,
              padding: "2px 7px",
              borderRadius: 6,
              letterSpacing: 0.5,
            }}
          >
            CLIENTE
          </motion.span>
        </div>
        <LiveBadge connected={connected} />
      </div>

      <div style={{ marginTop: 14, position: "relative" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, opacity: 0.94 }}>
          Hola, {name}{" "}
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: [0, -16, 12, -8, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.7 }}
          >
            👋
          </motion.span>
        </div>
        <AnimatePresence>
          {screen === "home" && (
            <motion.div
              key="greet-sub"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.62)", marginTop: 2 }}
            >
              ¿Qué hacés hoy? Tu auto se lo agradece.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function ErrorBanner({ error, onClose }) {
  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        background: T.coralSoft,
        color: T.coral,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span style={{ flex: 1 }}>{error}</span>
      <button onClick={onClose} aria-label="Cerrar aviso" style={{ color: T.coral, cursor: "pointer", display: "flex", flexShrink: 0 }}>
        <X size={15} />
      </button>
    </motion.div>
  );
}

function BottomNav({ screen, tier, onNavigate, hasReservation }) {
  const tierMeta = TIER_META[tier];
  const items = [
    { id: "home", label: "Inicio", icon: LayoutGrid, interactive: true },
    { id: "myres", label: "Mi lavado", icon: Car, interactive: true, badge: hasReservation },
    { id: "tier", label: tier, icon: Crown, interactive: false, color: tierMeta.color },
  ];

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
      style={{
        position: "relative",
        zIndex: 3,
        display: "flex",
        background: T.surface,
        borderTop: `1px solid ${T.line}`,
        padding: "8px 10px calc(8px + env(safe-area-inset-bottom, 0px))",
        boxShadow: "0 -10px 30px -22px rgba(10,51,45,0.5)",
      }}
    >
      {items.map((item) => {
        const active = screen === item.id;
        const Icon = item.icon;
        const color = item.color || (active ? T.primary : T.inkSoft);
        return (
          <motion.button
            key={item.id}
            onClick={() => item.interactive && onNavigate(item.id)}
            whileTap={{ scale: 0.86 }}
            transition={SPRING_SNAPPY}
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "8px 0 5px",
              cursor: item.interactive ? "pointer" : "default",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute",
                  top: 4,
                  bottom: 4,
                  width: 44,
                  borderRadius: 999,
                  background: T.primarySoft,
                }}
              />
            )}
            <span style={{ position: "relative", display: "flex" }}>
              <Icon size={21} color={color} strokeWidth={active ? 2.4 : 2} style={{ transition: `color ${T.tBase}, stroke-width ${T.tBase}` }} />
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_SNAPPY}
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -4,
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: T.coral,
                    border: "2px solid #fff",
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color,
                letterSpacing: 0.1,
                transition: `color ${T.tBase}`,
              }}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

function AppInner() {
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [time, setTime] = useState(null);
  const [vehicle, setVehicle] = useState("Mi VW Vento gris · AB123CD");
  const [name] = useState("Vos");
  const [tier] = useState("Oro");

  const [reservations, setReservations] = useState([]);
  const [myId, setMyId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [error, setError] = useState(null);
  const [celebrated, setCelebrated] = useState(false);

  const scrollRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    let alive = true;
    fetchReservations()
      .then((data) => {
        if (alive) {
          setReservations(data);
          setBootLoading(false);
        }
      })
      .catch(() => {
        if (alive) {
          setError("No se pudo conectar con el servidor. ¿Está corriendo `npm run dev` en /server?");
          setBootLoading(false);
        }
      });
    const unsubscribe = subscribeToReservations((data) => {
      if (alive) setReservations(data);
      setConnected(true);
    });
    return () => {
      alive = false;
      unsubscribe();
    };
  }, []);

  const myReservation = reservations.find((r) => r.id === myId);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen, step]);

  const navigate = useCallback((next) => {
    if (next === screen) return;
    setScreen(next);
  }, [screen]);

  const startBooking = useCallback(() => {
    setService(null);
    setTime(null);
    setStep(0);
    setScreen("book");
  }, []);

  const confirmBooking = useCallback(async () => {
    setConfirming(true);
    try {
      const created = await createReservation({ name, vehicle, tier, service: service.id, time });
      setMyId(created.id);
      setScreen("myres");
      setStep(0);
      setCelebrated(true);
      toast("Reserva confirmada", "success");
      setTimeout(() => setCelebrated(false), 3000);
    } catch (e) {
      toast("No se pudo confirmar la reserva. Intentá de nuevo.", "error", { duration: 3200 });
    } finally {
      setConfirming(false);
    }
  }, [name, vehicle, tier, service, time, toast]);

  return (
    <div className="app-frame">
      <Header connected={connected} name={name} screen={screen} />

      <AnimatePresence>
        {error && <ErrorBanner key="err" error={error} onClose={() => setError(null)} />}
      </AnimatePresence>

      <main ref={scrollRef} className="scroll-area no-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {screen === "home" && (
            <motion.div key="home" {...screenProps}>
              <HomeScreen
                onPickCarwash={startBooking}
                myReservation={myReservation}
                onViewRes={() => navigate("myres")}
                bootLoading={bootLoading}
              />
            </motion.div>
          )}

          {screen === "book" && step === 0 && (
            <motion.div key="book-0" {...screenProps}>
              <BookStepService onBack={() => navigate("home")} onSelect={(s) => { setService(s); setStep(1); }} />
            </motion.div>
          )}

          {screen === "book" && step === 1 && (
            <motion.div key="book-1" {...screenProps}>
              <BookStepTime service={service} onBack={() => setStep(0)} onSelect={(t) => { setTime(t); setStep(2); }} />
            </motion.div>
          )}

          {screen === "book" && step === 2 && (
            <motion.div key="book-2" {...screenProps}>
              <BookStepConfirm
                service={service}
                time={time}
                vehicle={vehicle}
                setVehicle={setVehicle}
                onBack={() => setStep(1)}
                onConfirm={confirmBooking}
                loading={confirming}
              />
            </motion.div>
          )}

          {screen === "myres" && (
            <motion.div key="myres" {...screenProps}>
              <MyReservation reservation={myReservation} onBack={() => navigate("home")} celebrated={celebrated} onBook={startBooking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav screen={screen} tier={tier} onNavigate={navigate} hasReservation={!!myReservation} />

      <Celebration trigger={celebrated} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
