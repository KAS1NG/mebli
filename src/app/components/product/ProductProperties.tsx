"use client";

import React, { useState } from "react";
import { IGetProperty } from "../../types/post";
import { removeProperty } from "../../actions/removeProperty";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import style from "../../styles/product/ProductProperties.module.scss";

interface ProductPropertiesProps {
  properties: IGetProperty[];
  isAdmin: boolean;
  accessToken?: string
}

function ProductProperties({
  properties,
  isAdmin,
  accessToken,
}: ProductPropertiesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = (id: number) => {
    removeProperty(id, accessToken);
  }

  if (!properties?.length) return null;

  return (
    <section className={style.card} aria-labelledby="properties-title">
      <button
        className={style.toggleBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span id="properties-title">Характеристики</span>
        {isOpen ? (
          <ChevronUp size={18} aria-hidden="true" />
        ) : (
          <ChevronDown size={18} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            key="properties-list"
            className={style.list}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {properties.map((item) => (
              <li key={item.id} className={style.item}>
                <span className={style.name}>{item.name}:</span>
                <span className={style.value}>{item.text}</span>
                {isAdmin && (
                  <button
                    aria-label={`Видалити властивість ${item.name}`}
                    className={style.removeBtn}
                    onClick={() => handleRemove(item.id)}
                  >
                    <X size={16} />
                  </button>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}

ProductProperties.displayName = "ProductProperties";

export default ProductProperties;

