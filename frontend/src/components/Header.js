import React, {Component} from 'react'
import logo from '../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'

class Header extends Component{
  render(){
    return(
      <React.Fragment>
        <header id="header">
         <div className="center">
            {/*LOGO*/}
            <div id="logo">
               <img src={logo} className="app-logo" alt="Logotipo" />
               <span id="brand">
                  <strong>Master</strong> REACT
               </span>
            </div>
            {/*MENÚ*/}
            <nav id="menu">
               <ul>
                  <li>
                     <NavLink to="/home" activeClassName='active'>Inicio</NavLink>
                  </li>
                  <li>
                     <NavLink to="/blog" activeClassName='active'>Blog</NavLink>
                  </li>
                  <li>
                     <NavLink to="/formulario" activeClassName='active'>Formulario</NavLink>
                  </li>
                  <li>
                     {/* <NavLink to="/mi-componente" activeClassName='active'>Página 1</NavLink> */}
                     <NavLink to="/home" activeClassName='active'>Página 1</NavLink>
                  </li>
                  <li>
                     {/* <NavLink to="/peliculas" activeClassName='active'>Página 2</NavLink> */}
                     <NavLink to="/home" activeClassName='active'>Página 2</NavLink>
                  </li>
               </ul>
            </nav>
            {/*Limpiar lo flotado*/}
            <div className="clearfix"></div>
         </div>
      </header>
      </React.Fragment>
    )
  }
}

export default Header