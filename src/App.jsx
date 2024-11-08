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
import NewPrestamo from "./components/Prestamos/NewPrestamo";
import PagoCliente from "./components/Pagos/PagoCliente";
import PagoCuota from "./pages/PagoCuota";
import Capital from "./pages/Capital";
import TipoPrestamo from "./pages/TipoPrestamo";
import Empresa from "./pages/Empresa";
import Reportes from "./pages/Reportes";

function App() {
  const [pageTitle, setPageTitle] = useState("");
  //const [isAuth, setIsAuth] = useState(false) // Estado para controlar si el usuario está autenticado

  //Traemos los datos que necesitemos del estado global
  const datosUsuario = useAuthStore((state) => ({
    isAuth: state.isAuth,
    rol: state.rol,
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
                path="/clientes/requisitos"
                element={<CustomersMulti setTitle={setTitle} />}
              />
              <Route
                path="/prestamos"
                element={<Prestamos setTitle={setTitle} />}
              />
              <Route path="prestamos/new" 
              element={<NewPrestamo setTitle={setTitle} />} />

              <Route
                path="/pagos"
                element={<Pagos setTitle={setTitle} />}
              />

              <Route
                path="/pagos/cliente"
                element={<PagoCliente setTitle={setTitle} />}
              />
              

              <Route 
                path="/pagos/pago-cuota"
                element={<PagoCuota setTitle={setTitle} />}
              />
              
              <Route
                path="/usuarios"
                element={<Usuarios setTitle={setTitle} />}
              />
              
              <Route 
                path="/capital"
                element={<Capital setTitle={setTitle} />}
              />

              <Route
                path="/tipos-prestamos"
                element={<TipoPrestamo setTitle={setTitle} />}
              />

              <Route
                path="/info-empresa"
                element={<Empresa setTitle={setTitle} />}
              />

              <Route
                path="/reportes"
                element={<Reportes setTitle={setTitle} />}
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
