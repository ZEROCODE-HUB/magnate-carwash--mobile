import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { EASE, SPRING_SNAPPY } from "../../motion.js";

// Envoltura interactiva: levita al hover y se hunde al presionar.
// Todas las tarjetas/botones del app la usan para feedback instantáneo.
const Pressable = forwardRef(function Pressable(
  { children, onPress, lift = 2, tapScale = 0.97, whileHover, whileTap, style, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      onTap={onPress}
      whileHover={whileHover === undefined ? (lift ? { y: -lift } : undefined) : whileHover}
      whileTap={whileTap === undefined ? { scale: tapScale } : whileTap}
      transition={{ y: { duration: 0.22, ease: EASE }, scale: { ...SPRING_SNAPPY, duration: 0.28 } }}
      style={style}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export default Pressable;
