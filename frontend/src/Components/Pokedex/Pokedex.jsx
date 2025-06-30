import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
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

    /**
   * Función asíncrona que obtiene una lista de Pokémon desde la API pública de PokéAPI.
   * - Primero obtiene una lista básica con los nombres y URLs de detalle de 50 Pokémon.
   * - Luego, hace una segunda tanda de llamadas para obtener la información detallada de cada Pokémon.
   * - Finalmente, actualiza el estado `setPersonajes` con los datos detallados.
   */
    const obtenerPokemones = async () => {
      try {
        // Hacemos la primera solicitud para obtener una lista de 50 Pokémon (nombre y URL de detalle)
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const datos = await respuesta.json();


        // Para cada Pokémon en la lista, hacemos una nueva solicitud a su URL para obtener los detalles completos
        const datosDetallados = await Promise.all(
          datos.results.map(async (pokemon) => {
            // llamamos a la URL individual del Pokémon
            const res = await fetch(pokemon.url);
            // devolvemos el JSON con la info completa
            return await res.json();
          })
        );
        // Actualiza el estado con los datos completos de todos los Pokémon
        setPersonajes(datosDetallados);
      } catch (error) {
        // En caso de error, lo mostramos en consola
        console.error("Error al obtener los Pokémon:", error);
      }
    };
    // Llamamos a la función para ejecutar el flujo
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
    <div className="characters text-center ">
      <h1 className="title">Pokédex</h1>

      {/* Lista de Pokémon actuales */}
      <div className="container-characters d-flex flex-wrap justify-content-center">
        {pokemonesActuales.map((pokemon, index) => (
          <div className="character-container card m-2 p-3" key={index} >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="img-fluid imagen-pokemon mx-auto"

            />
            <h3 >{pokemon.name}</h3>
            <p className="text">Tipo:</p> <p className="text-capitalize"> {pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p className="text"> Habilidades:</p> <p className="text-capitalize">{pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
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
          <FaCircleArrowLeft className="mx-2" />
          Anterior
        </button>

        <span className="align-self-center">Página {paginaActual} de {totalPaginas}</span>

        <button
          onClick={paginaSiguiente}
          className="btn btn-outline-primary mx-2"
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
          <FaCircleArrowRight className="mx-2" />
        </button>
      </div>

      <button className="btn btn-primary mt-2" onClick={volverAHome}>
        Inicio
      </button>
    </div>
  );
};

export default Pokedex;
