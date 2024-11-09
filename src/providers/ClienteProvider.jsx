import { create } from 'zustand';

// Store para manejar el cliente seleccionado
export const useStoreCliente = create((set) => ({
  clienteSelectedGlobal: null, // Estado inicial
  setClienteSelectedGlobal: (cliente) => set({ clienteSelectedGlobal: cliente }), // Función para actualizar el estado
}));