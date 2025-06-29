import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pokedex.css";

const Pokedex = () => {
  // Estado que contiene todos los Pokémon cargados
  const [personajes, setPersonajes] = useState([]);

  // Página actual
  const [paginaActual, setPaginaActual] = useState(1);

  // Cantidad de Pokémon por página
  const [pokemonPorPagina] = useState(10);

  const navegar = useNavigate();

  // useEffect que obtiene los Pokémon desde la API al cargar el componente
  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const datos = await respuesta.json();

        const datosDetallados = await Promise.all(
          datos.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPersonajes(datosDetallados);
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      }
    };

    obtenerPokemones();
  }, []);

  // Redirige al usuario al home
  const volverAHome = () => {
    navegar("/home");
  };

  // Cálculo de los índices para obtener los Pokémon de la página actual
  const indiceUltimoPokemon = paginaActual * pokemonPorPagina;
  const indicePrimerPokemon = indiceUltimoPokemon - pokemonPorPagina;
  const pokemonesActuales = personajes.slice(indicePrimerPokemon, indiceUltimoPokemon);

  // Total de páginas
  const totalPaginas = Math.ceil(personajes.length / pokemonPorPagina);

  // Función para ir a la página siguiente
  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  // Función para ir a la página anterior
  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  if (!personajes.length) return <p className="text-center mt-5">Cargando pokémon...</p>;

  return (
    <div className="characters text-center">
      <h1>Pokédex</h1>

      <span
        className="back-home"
        onClick={volverAHome}
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
      >
        Volver a la home
      </span>

      {/* Lista de Pokémon actuales */}
      <div className="container-characters d-flex flex-wrap justify-content-center">
        {pokemonesActuales.map((pokemon, index) => (
          <div className="character-container card m-2 p-3" key={index} style={{ width: "200px" }}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="img-fluid imagen-pokemon mx-auto"
              style={{ width: "120px" }}
            />
            <h3 className="text-capitalize">{pokemon.name}</h3>
            <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="d-flex justify-content-center my-4">
        <button
          onClick={paginaAnterior}
          className="btn btn-outline-primary mx-2"
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <span className="align-self-center">Página {paginaActual} de {totalPaginas}</span>

        <button
          onClick={paginaSiguiente}
          className="btn btn-outline-primary mx-2"
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      <button className="btn btn-primary mt-2" onClick={volverAHome}>
        Volver a la home
      </button>
    </div>
  );
};

export default Pokedex;
