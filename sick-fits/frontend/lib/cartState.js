import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [open, setOpen] = useState(false);
  function openCart() {
    setOpen(true);
  }
  function closeCart() {
    setOpen(false);
  }
  function toggleCart() {
    setOpen(!open);
  }
  return (
    <LocalStateProvider
      value={{ open, openCart, closeCart, setOpen, toggleCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
