import React from "react";
import { STATUS_FLOW } from "../../data.js";
import { T } from "../../theme.js";

export default function StatusStepper({ status }) {
  const idx = STATUS_FLOW.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      {STATUS_FLOW.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ width: 10, height: 10, borderRadius: 999, flexShrink: 0, background: i <= idx ? T.primary : T.line, transition: "background .4s ease" }} />
          {i < STATUS_FLOW.length - 1 && (
            <div style={{ flex: 1, height: 3, background: i < idx ? T.primary : T.line, transition: "background .4s ease" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
