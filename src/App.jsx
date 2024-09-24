import { useState, useEffect } from "react";
import "./styles/App.scss";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import useAuthStore from "./providers/User";
import Customers from "./pages/Customers";
import Prestamos from "./pages/Prestamos";
import Pagos from "./pages/Pagos";
import Usuarios from "./pages/Usuarios";
import CustomersMulti from "./pages/CustomersMulti";

function App() {
  const [pageTitle, setPageTitle] = useState("");
  const [isAuth, setIsAuth] = useState(true) // Estado para controlar si el usuario está autenticado

  //Traemos los datos que necesitemos del estado global
  const datosUsuario = useAuthStore((state) => ({
    isAuth: true,
    rol: "Administrador",
  }));

  //Traemos el método para cambiar los valores del estado
  const { setUser } = useAuthStore();

  /* Cambiar el encabezado de la página */
  const setTitle = (title) => {
    setPageTitle(title);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token almacenado en el navegador
    if (token) {
      setUser(
        true,
        localStorage.getItem("token"),
        localStorage.getItem("user"),
        localStorage.getItem("rol")
      ); // Si el token existe, el usuario está autenticado
    }
  }, []);

  if (!datosUsuario.isAuth) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        {/* Sidebar */}
        <Sidebar pageTitle={pageTitle}>
          <Routes>
            {/* Rutas que pueden ser accedidas por usuarios autenticados*/}
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute isAllowed={datosUsuario.isAuth}>
                  <Home setTitle={setTitle} />
                </ProtectedRoute>
              }
            />
            {/* Rutas que pueden ser accedidas por usuarios autenticados y que sean 'Administrador' */}
            <Route
              element={
                <ProtectedRoute
                  redirectTo="/"
                  isAllowed={
                    datosUsuario.isAuth &&
                    datosUsuario.rol === "Administrador"
                  }
                />
              }
            >
              
              {/* Colocar las demas */}
            </Route>
            {/* Rutas que pueden ser accedidas por usuarios autenticados y que sean 'Invitado' o 'Administrador' */}
            <Route
              element={
                <ProtectedRoute
                  redirectTo="/"
                  isAllowed={
                    datosUsuario.isAuth &&
                    (datosUsuario.rol === "Administrador" ||
                      datosUsuario.rol === "Invitado")
                  }
                />
              }
            >
              <Route
                path="/"
                element={<Home setTitle={setTitle} />}
              />
              {/* Colocar las demas */}
              <Route
                path="/clientes"
                element={<Customers setTitle={setTitle} />}
              />

              <Route
                path="/multiple"
                element={<CustomersMulti setTitle={setTitle} />}
              />
<Route
                path="/prestamos"
                element={<Prestamos setTitle={setTitle} />}
              />

              <Route
                path="/pagos"
                element={<Pagos setTitle={setTitle} />}
              />

              <Route
                path="/usuarios"
                element={<Usuarios setTitle={setTitle} />}
              />
              
            </Route>
            {/* */}

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
