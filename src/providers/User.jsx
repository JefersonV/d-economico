import { create } from "zustand";

const useAuthStore = create((set) => ({
    isAuth: false,
    token: "",
    nombreUsuario: "",
    rol: "",
    userId: "", // Agregar ID del usuario
    setUser: (nesAuth, newToken, newNombreUsuario, newRol, newUserId) => // Añadir newUserId
        set(() => ({
            isAuth: nesAuth,
            token: newToken,
            nombreUsuario: newNombreUsuario,
            rol: newRol,
            userId: newUserId, // Almacenar el ID del usuario
        })),
}));

export default useAuthStore;