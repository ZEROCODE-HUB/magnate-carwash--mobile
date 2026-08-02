import { Car, Coffee, UtensilsCrossed, ShoppingBag, Droplets, Wind, Sparkles,
  CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

export const STATUS_META = {
  "Reservado": { color: "#8A7B66", bg: "#F1EADF", icon: TimerReset },
  "Recibido": { color: T.primary, bg: T.primarySoft, icon: CircleDot },
  "Lavando": { color: T.info, bg: T.infoSoft, icon: Droplets },
  "Aspirado": { color: T.violet, bg: T.violetSoft, icon: Sparkles },
  "Detailing": { color: T.accentDark, bg: T.accentSoft, icon: Sparkles },
  "Secado": { color: T.teal, bg: T.tealSoft, icon: Wind },
  "Listo": { color: T.success, bg: T.successSoft, icon: CheckCircle2 },
};

export const SERVICES = [
  { id: "basico", name: "Lavado Básico", desc: "Exterior + secado", price: 8000, mins: 20, icon: Droplets },
  { id: "premium", name: "Lavado Premium", desc: "Exterior, interior y aspirado", price: 14000, mins: 35, icon: Sparkles },
  { id: "encerado", name: "Encerado", desc: "Premium + cera protectora", price: 20000, mins: 50, icon: Wind },
];

export const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];

export const TIER_META = {
  "Bronce": { color: "#A0632E", bg: "#F5E4D2", icon: Medal },
  "Plata": { color: "#6B7A80", bg: "#E8EEF0", icon: Award },
  "Oro": { color: T.accentDark, bg: T.accentSoft, icon: Crown },
};

export const CATEGORIES = [
  { id: "carwash", name: "Lavadero", icon: Car, live: true },
  { id: "hamburgueseria", name: "Hamburguesería", icon: UtensilsCrossed, live: false },
  { id: "cafeteria", name: "Cafetería", icon: Coffee, live: false },
  { id: "kiosco", name: "Kiosco", icon: ShoppingBag, live: false },
];
