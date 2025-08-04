// components/CartToast.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Props {
  show: boolean;
}

export default function CartToast({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle className="w-6 h-6 text-white" />
          <span>Товар додано до кошика</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
