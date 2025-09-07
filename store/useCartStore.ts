import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  itemid: string;
  title: string;
  image?: string;
  // priceRange?: [number, number];
  priceRange?: number;
  price?: number | undefined;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (itemid: string, quantity: number) => void;
  removeFromCart: (itemid: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (newItem) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(item => item.itemid === newItem.itemid);
          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += newItem.quantity;
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, newItem] };
          }
        }),

      updateQuantity: (itemid, quantity) =>
        set((state) => {
          const updatedCart = state.cart.map(item =>
            item.itemid === itemid ? { ...item, quantity } : item
          );
          return { cart: updatedCart };
        }),

      removeFromCart: (itemid) =>
        set((state) => ({
          cart: state.cart.filter(item => item.itemid !== itemid)
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);

/* 

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.itemid === item.itemid);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.itemid === item.itemid
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (itemid) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.itemid !== itemid),
        })),
      updateQuantity: (itemid, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.itemid === itemid ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
*/
