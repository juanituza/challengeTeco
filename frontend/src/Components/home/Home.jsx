import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navegar = useNavigate();

  const LinkPokedex = () => {
    navegar("/pokedex");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="title">Pokédex</h1>
      <img src="/pokeapi.png" alt="Pokeapi" className="pokeapi mb-3" />
      <button onClick={LinkPokedex} className="btn btn-primary">
        Buscar Pokémon
      </button>
    </div>
  );
};

export default Home;

