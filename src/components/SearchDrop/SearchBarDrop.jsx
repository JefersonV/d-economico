import React, { useState, useEffect, useRef } from 'react'
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence } from 'framer-motion'
import "../../styles/Searchbar.scss"
import DataMenuDrop from './DataMenuDrop';
import { SearchBarContainer } from './SearchBarContainer';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FcSearch } from 'react-icons/fc'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { FormGroup } from 'reactstrap'
import { TbError404 } from "react-icons/tb";

function SearchBarDrop(props) {
  // Expande u oculta el componente DataMenuDrop
  const [isExpanded, setExpanded] = useState(false);
  // hook que detecta si se dió click por fuera de DataMenuDrop
  const [parentRef, isClickedOutside] = useClickOutside();
  // Referencia para limpiar el input de búsqueda
  const inputRef = useRef();
  // Valor capturado del input
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  const isEmpty = !props.clienteData || props.clienteData.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    // Si el elemento está vacío o solo contiene espacios en blanco
    if (e.target.value.trim() === "") props.setNoDataCliente(false);

    setSearchQuery(e.target.value);
    // console.log('Search Query: ', typeof e.target.value)
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    //anterior valor del input de búsqueda
    // setSearchQuery("");
    props.setSearchValueInput("")
    setLoading(false);
    props.setNoDataCliente(false)
    // setMenu([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    // Si se le da por fuera del SearchContent
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  // Filtrado
  //searchQuery anterior valor del input de búsqueda
  //serachValueInput valor actual del input de búsqueda
  // const valueInput = props.searchValueInput;
  /* const filtradoCliente = !props.searchValueInput ? props.clienteData
  // Si se ha ingresado información al input, que la compare a los criterios y los filtre
  : props.clienteData.filter((item) =>
    item.nombre?.toLowerCase().includes(props.searchValueInput.toLocaleLowerCase() ||
    parseInt(item.index).toLocaleLowerCase().includes(props.searchValueInput.toLocaleLowerCase()))
  ) */
  
    const filtradoCliente = props.clienteData && props.clienteData.length > 0
    ? props.clienteData.filter((item) =>
        item.nombre?.toLowerCase().includes(props.searchValueInput.toLowerCase()) ||
        item.index?.toString().includes(props.searchValueInput)
      )
    : [];

  /* const filtradoCliente = !props.searchValueInput
  //Cliente data es el array de clientes encontrados
  ? props.clienteData
  : props.clienteData.filter((item) =>
    item.nombre?.toLowerCase().includes(props.searchValueInput.toLowerCase()) ||
    item.index?.toString().includes(props.searchValueInput)
  ); */

  // Si el array filtrado está vacío, actualizar noDataCliente a true
  useEffect(() => {
    if (props.searchValueInput && filtradoCliente.length === 0) {
      props.setNoDataCliente(true);
    } else {
      props.setNoDataCliente(false);
    }
  }, [filtradoCliente, props.searchValueInput]);

  // console.log(typeof (filtradoCliente))
  // console.log(JSON.stringify(filtradoCliente, null, 2))
  /* Framer motion */
  const containerVariants = {
    expanded: {
      height: "30em",
    },
    collapsed: {
      height: "3em",
    },
  };

  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

  // useDebounce(searchQuery, 500, showMenu)
  return (
    <>
      <SearchBarContainer
        className="SearchInputContainer--parent"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
      >
        <div className="SearchInputContainer">
          <InputGroup>
            <InputGroupText>
              <FcSearch />
            </InputGroupText>
            <Input
              type="text"
              className="SearchInputs"
              onFocus={expandContainer}
              ref={inputRef}
              onChange={props.handleSearch} // Aquí usas handleSearch desde props
              value={props.searchValueInput}
              placeholder="Nombre o # de platillo del menú"
            />
          </InputGroup>
          <AnimatePresence>
            {isExpanded && (
              <div className="CloseIcon" onClick={collapseContainer}>
                <IoClose />
              </div>
            )}
          </AnimatePresence>
        </div>
        {isExpanded && (
          <div className="SearchContent">
            {/* Mensaje si no hay clientes ingresados */}
            {isEmpty && !props.noDataCliente && (
              <div className="LoadingWrapper">
                
                <span className="WarningMessage">Escribe el nombre del cliente</span>
              </div>
            )}
            {/* Mensaje si no se encontró el cliente */}
            {props.noDataCliente && (
              <div className="LoadingWrapper">
                <div>
                  
                </div>
                <p>
                  <span className="WarningMessage">No se encontró el cliente con los criterios especificados </span>
                </p>
                <p>
                  <TbError404 size={40} color="red"/>
                </p>
              </div>
            )}
            {/* Renderizado de los resultados filtrados */}
            {!isEmpty && filtradoCliente.map((item, index) => (
              /* Aqui se muestran todos los datos filtrados */
              <DataMenuDrop
                itemSelected={props.itemSelected}
                setItemSelectedList={props.setItemSelectedList}
                key={item?.idcliente}
                nameCliente={item?.apellido}
                telefono={item?.telefono}
                index={index}
                id={item?.idcliente}
              />
            ))}
          </div>
        )}
      </SearchBarContainer>
    </>
  );
}

export default SearchBarDrop