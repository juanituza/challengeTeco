import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Login.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();





    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/sesiones/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // importante si usás cookies
            });

            const responseData = await response.json();

            if (responseData.status === "success") {

                Swal.fire({
                    title: 'Successfully logged in',
                    text: 'Redirecting to home...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    setIsAuthenticated(true);
                    navigate("/home");
                });


            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "Login failed",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error de conexión con el servidor.",
            });
            console.error("Error:", error);
        }
    };

    return (
        <section className="vh-100 m-5">
            <div className="container-fluid h-custom card cardLogin">
                <div className="row align-items-center bg-light py-3 contenedorLogin">
                    <div className="col-lg-4 m-2">
                        <span className="h1 text-uppercase text-primary px-2 titleChallenge">Challenge</span>
                        <span className="h1 text-uppercase px-2 ml-n1 titleTeco">TECO</span>
                    </div>

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5 my-4">
                            <img src="/login.png" className="img-fluid" alt="Login" />
                        </div>

                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label className="form-label label-icon">
                                        <CiMail /> Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-underline"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="form-label label-icon">
                                        <RiLockPasswordLine /> Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-underline"
                                        required
                                    />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary boton btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                                        Ingresar
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        No tienes cuenta?
                                        <Link to="/register" className="link-danger mx-2">Registrarme</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
