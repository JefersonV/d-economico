import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import { FaBars } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { MdLogout } from "react-icons/md";
/* Provider (estado global)*/
import { useStore, useSubItem } from "../../providers/GlobalProvider";
import logoDE from '../../assets/images/logo-de.png';
import "../../styles/App.scss";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const { children, pageTitle } = props;
  /* Estado global de la sidebar */
  const isOpen = useStore((state) => state.sidebar);
  const toggle = useStore((state) => state.showSidebar);
  const subNav = useSubItem((state) => state.subNav);

  // const userId = localStorage.getItem("userId");
  const usuarioLoggeado = localStorage.getItem("user");
  const rolUsuario = localStorage.getItem("rol");
  // console.log(isOpen);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  return (
    <>
      <header className="header">
        <div
          className={
            isOpen
              ? "nav-icon-open nav-icon bars"
              : "nav-icon-close nav-icon bars"
          }
        >
        <div className="container-svg">  
          <input className="label-check" id="label-check" type="checkbox" />
            <label htmlFor="label-check" className="hamburger-label" onClick={toggle}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            <label></label></label></div>
          {/* <FaBars onClick={toggle} /> */}
          <h3 className="page-title">{pageTitle}</h3>
        </div>
        <div className="header-info-user">
          <span>{usuarioLoggeado || ""}</span>
          <span>{rolUsuario || ""}</span>
        </div>
        <div>
          <img
            className="header-avatar"
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            width="50px"
            height="50px"
            alt="Imagen del perfil del usuario"
          />
        </div>
      </header>
      <div className="container-sidebar">
        <aside
          className={isOpen ? "sidebar sidebarOpen" : "sidebar sidebarClose"}
        >
          <section className="top_section">
            {/* Sidebar completa o incompleta  */}
            {/* isOpen === true -> se mostrará el h1 por defecto, de lo contrario se oculta */}
            <div className="logo">
              <Link to="/" className="m-0">
                <img style={{ width: isOpen ? "145px" : "50px" }} className="logo-microfinanciera" width="20px" src={logoDE} alt="Logo microfinanciera" />
              </Link>

              {/* <p className="logo-text-right m-0" style={{ display: isOpen ? "block" : "none"}}> <br /> </p> */}
            </div>
            
          </section>
          {/* Items de la sidebar */}
          {SidebarData.map((item, index) => {
            // return <SidebarItem item ={item} isOpen={isOpen} key={index} />;
            return <SidebarItem item={item} key={index} />;
          })}
          <button
              type="button"
              className="btn btn-light d-block m-auto mt-5"
              onClick={cerrarSesion}
            >
              {isOpen ? (
                <>
                  <MdLogout color="#b23124" size={28} />
                  <span style={{ color: "#b23124" }}> Cerrar sesión</span>
                </>
              ) : (
                <>
                  <MdLogout color="#b23124" size={28} />
                </>
              )}
            </button>
          {/* <div
            className="d-flex justify-content-center"
            style={{ position: "relative", bottom: "-16em" }}
          >
            
          </div> */}
        </aside>
        {/* Componentes */}
        <main>{children}</main>
      </div>
    </>
  );
}

export default Sidebar;
