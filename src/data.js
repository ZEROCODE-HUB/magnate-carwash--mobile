import { Car, Coffee, UtensilsCrossed, ShoppingBag, Droplets, Wind, Sparkles,
  CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

export const STATUS_META = {
  "Reservado": { color: T.inkSoft, bg: "#ECEAE3", icon: TimerReset },
  "Recibido": { color: T.primary, bg: T.primarySoft, icon: CircleDot },
  "Lavando": { color: "#2472B8", bg: "#DCEBFA", icon: Droplets },
  "Aspirado": { color: "#7A57C2", bg: "#E9E1F7", icon: Sparkles },
  "Detailing": { color: T.accentDark, bg: T.accentSoft, icon: Sparkles },
  "Secado": { color: "#2F8F7A", bg: "#DCF2EB", icon: Wind },
  "Listo": { color: "#1B7A3D", bg: "#DEF3E3", icon: CheckCircle2 },
};

export const SERVICES = [
  { id: "basico", name: "Lavado Básico", desc: "Exterior + secado", price: 8000, mins: 20, icon: Droplets },
  { id: "premium", name: "Lavado Premium", desc: "Exterior, interior y aspirado", price: 14000, mins: 35, icon: Sparkles },
  { id: "encerado", name: "Encerado", desc: "Premium + cera protectora", price: 20000, mins: 50, icon: Wind },
];

export const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];

export const TIER_META = {
  "Bronce": { color: "#A15C2A", bg: "#F1E1D2", icon: Medal },
  "Plata": { color: "#5B6B72", bg: "#E7ECEE", icon: Award },
  "Oro": { color: "#B8860B", bg: T.accentSoft, icon: Crown },
};

export const CATEGORIES = [
  { id: "carwash", name: "Lavadero", icon: Car, live: true },
  { id: "hamburgueseria", name: "Hamburguesería", icon: UtensilsCrossed, live: false },
  { id: "cafeteria", name: "Cafetería", icon: Coffee, live: false },
  { id: "kiosco", name: "Kiosco", icon: ShoppingBag, live: false },
];
