import React from "react";
import "./NavBar.css";

// import useFetch from "../../hooks/useFetch.jsx";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import BounceLoader from "react-spinners/BounceLoader";

const Navbar = () => {


    return (

        <div className="row">
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                    <Link to="/home" className="col-1">
                        <img src="/telecom_argentina_logo.jpeg" alt="Logo" className="logo" />
                    </Link>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li>
                                <NavLink
                                    to="/home"
                                    className={({ isActive }) =>
                                        "nav-link scrollto" + (isActive ? " active" : "")
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/pokedex"
                                    className={({ isActive }) =>
                                        "nav-link scrollto" + (isActive ? " active" : "")
                                    }
                                >
                                    Pokédex
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    {/* Contacto a la derecha */}
                    <NavLink to="/contacto" className="contacto-link">
                        contacto
                    </NavLink>
                </div>
            </header>










        </div>
    );
};

export default Navbar;