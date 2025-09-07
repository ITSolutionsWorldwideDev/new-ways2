// /store/cartStore.ts
import { create } from "zustand";


type CartItem = {
  id: string;
  itemid: string;
  title: string;
  image?: string;
  // priceRange?: [number, number];
  priceRange?: number;
  price?: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (itemid: string, quantity: number) => void;
  removeFromCart: (itemid: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (newItem) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(item => item.itemid === newItem.itemid);
      if (existingIndex !== -1) {
        // Update quantity
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
}));

/* type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
 */