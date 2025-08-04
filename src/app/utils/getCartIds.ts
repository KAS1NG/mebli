export const getCartIds = (): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) as number[] : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

export const addToLocalCart = (id: number): void => {
  if (typeof window === "undefined") return;

  const current = getCartIds();
  if (!current.includes(id)) {
    const updated = [...current, id];
    localStorage.setItem("cart", JSON.stringify(updated));
  }
};

export const removeFromCart = (id: number): void => {
  if (typeof window === "undefined") return;

  const current = getCartIds();
  const updated = current.filter(itemId => itemId !== id);
  localStorage.setItem("cart", JSON.stringify(updated));
};

/**
 * Очищує корзину
 */
export const clearCart = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};