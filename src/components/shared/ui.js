import { T } from "../../theme.js";

export const card = {
  background: T.surface,
  border: `1px solid ${T.line}`,
  borderRadius: 18,
  padding: 16,
  boxShadow: T.shadowCard,
};

export const primaryBtn = {
  width: "100%",
  background: T.primary,
  color: "white",
  border: "none",
  borderRadius: 14,
  padding: "14px 0",
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  fontSize: 13.5,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
