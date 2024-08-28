import React from 'react'
/* icons */
import { AiFillHome } from "react-icons/ai"
import { FaCashRegister, FaCartPlus,FaUserCog, FaHouseUser } from "react-icons/fa"
import { MdOutlineInventory } from "react-icons/md"
import { TbBrandShopee } from "react-icons/tb"
import { VscGraph } from "react-icons/vsc"
import { GrConfigure } from "react-icons/gr"
import { BiFoodMenu } from "react-icons/bi"
import { FiTruck } from "react-icons/fi"
import { RiArrowDownSFill } from 'react-icons/ri'
import { RiArrowUpSFill } from 'react-icons/ri'
/* Arrows */
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri"
/* 
  MÓDULOS
  Dashboard
  Inventario (sub módulos --> compras ventas)
  caja
  Usuarios
  Reportes
  Config (sub módulos --> menu, proveedores clientes)
  */

export const SidebarData = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiFillHome />,
  },
 /*  {
    title: "Clientes",
    path: "/inventory",
    icon: <MdOutlineInventory />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Préstamos",
        path: "/sales",
        icon: <FaCartPlus/>,
        class: "nav-subItem",
      },
      {
        title: "Calculadora",
        path: "/purchases",
        icon: <TbBrandShopee/>,
        class: "nav-subItem",
      }
    ]
  } */
 {
    title: "Clientes",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Préstamos",
    path: "/cash-box",
    icon: <FaCashRegister />,
  },
  {
    title: "Pagos clientes",
    path: "/users",
    icon: <FaUserCog />,
  },
  {
    title: "Calculadora",
    path: "/reports",
    icon: <VscGraph />,
  },
  {
    title: "Capital",
    path: "/reports",
    icon: <VscGraph />,
  },
  {
    title: "Reportes",
    path: "/reports",
    icon: <VscGraph />,
  },
  {
    title: "Configuración",
    path: "/config",
    icon: <GrConfigure />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Dias de gracia",
        path: "/menu",
        icon: <BiFoodMenu />,
        class: "nav-subItem",
      },
      {
        title: "Usuarios",
        path: "/providers",
        icon: <BiFoodMenu />,
        class: "nav-subItem",
      }
    ]
  }
];