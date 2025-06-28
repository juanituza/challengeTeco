import React from "react";
import "./NavBar.css";

// import useFetch from "../../hooks/useFetch.jsx";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import BounceLoader from "react-spinners/BounceLoader";

const Navbar = () => {
   

    return (

        <div className="row">
            {/* // <!-- ======= Header ======= --> */}
            <header id="header" className="fixed-top d-flex align-items-cente">
                
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                        <Link to="/" className="col-1">
                            <img src="/El arte del vino.png" alt="Logo" className="logo" />
                            {/* <p className="my-3 titulo-navbar"> El arte del vino</p> */}
                        </Link>


                        <nav id="navbar" className="navbar order-last order-lg-0">



                            <ul>
                                <li>
                                    <NavLink
                                        to="/home"
                                        className={({ isActive }) => "nav-link scrollto" + (isActive ? " active" : "")}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/home"
                                        className={({ isActive }) => "nav-link scrollto" + (isActive ? " active" : "")}
                                    >
                                        Pokédex
                                    </NavLink>
                                </li>
                                {/* {categoriasUnicas.map((categoria) => (
                                    <li key={categoria}>
                                        <NavLink to={`/categoria/${categoria}`} className={({ isActive }) => "nav-link scrollto" + (isActive ? " active" : "")}>
                                            {categoria}
                                        </NavLink>
                                    </li>
                                ))} */}

                            </ul>
                        </nav>

                        {/* <!-- .navbar --> */}

                        <a href="#book-a-table" className="book-a-table-btn scrollto d-none d-lg-flex">contacto</a>

                    </div>
                
            </header>
            {/* <!-- End Header --> */}










        </div>
    );
};

export default Navbar;