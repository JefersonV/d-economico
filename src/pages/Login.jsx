import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoDE from "../assets/images/logo-de.png";

function Login() {
    //const api = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const estilosImagen = {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const estilosDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#031633",
  };

  const notification = (mensaje) =>
    toast.error(mensaje, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const handleSubmit = async (event) => {
      event.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: user, contrasenia: password }),
      };
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/Account/login`,
          requestOptions
        );
        const data = await response.json();
        setResponse(data);
  
        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.nombreUsuario);
          localStorage.setItem("rol", data.rol);
          localStorage.setItem("userId", data.id); // Almacenar ID del usuario
          setUser(true, data.token, data.nombreUsuario, data.rol, data.id); // Actualizar el estado global
          window.location.href = "/";
        } else {
          notification(data.mensaje || "Error al iniciar sesión.");
        }
      } catch (error) {
        notification("Error en la conexión. Inténtalo de nuevo.");
      }
  };

  useEffect(() => {
    console.info(response)
  }, [response]);

  const handleUserChange = (event) => {
    const lowercaseValue = event.target.value.toLowerCase();
    const onlyLowerCase = lowercaseValue.replace(/[^a-z]/g, "");
    setUser(onlyLowerCase);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      <div className="container-fluid contenedor-login" style={estilosDiv}>
        <div className="card mb-3" style={{ backgroundColor: "#f2f2f2" }}>
          <div className="card-body">
            <img src={logoDE} alt="logo microfinanciera" width="250px" />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUser"
                  value={user}
                  onChange={handleUserChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="inputPassword"
                    placeholder=""
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <AiFillEye /> :  <AiFillEyeInvisible />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Ingresar
              </button>
            </form>
            {response && <p>{response.message}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
