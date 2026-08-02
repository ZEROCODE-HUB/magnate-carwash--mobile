import { T } from "../../theme.js";

export const card = {
  background: T.gradCard,
  border: `1px solid ${T.line}`,
  borderRadius: T.rLg,
  padding: 18,
  boxShadow: T.shadowCard,
};

export const primaryBtn = {
  width: "100%",
  background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
  color: T.onPrimary,
  border: "none",
  borderRadius: T.rPill,
  padding: "15px 0",
  fontFamily: T.fontBody,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: T.shadowBtn,
};
