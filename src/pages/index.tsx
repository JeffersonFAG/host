// pages/index.tsx
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Footer from "./components/Atoms/Footer";
interface PokemonProps {
  id: number;
}

const RemotePokemon1 = dynamic<PokemonProps>(() => import("remote1/Pokemon"));
const RemotePokemon2 = dynamic<PokemonProps>(() => import("remote2/Pokemon"));
const RemotePokemon3 = dynamic<PokemonProps>(() => import("remote3/Pokemon"));

const HomePage: React.FC = () => {
  // Estado para almacenar IDs de Pokémon específicos para cada remoto
  const [pokemonIds, setPokemonIds] = useState<{ [key: string]: number }>({
    remote1: 1,
    remote2: 2,
    remote3: 3,
  });

  // Función para cambiar los IDs de Pokémon en todos los remotos
  const changePokemon = () => {
    setPokemonIds((prevIds) => {
      // Calcula nuevos IDs para cada remoto
      const newIds = {
        remote1: prevIds.remote1 + 5,
        remote2: prevIds.remote2 + 3,
        remote3: prevIds.remote3 + 7,
      };

      // Emite un evento con los nuevos IDs
      window.dispatchEvent(
        new CustomEvent("changePokemon", { detail: newIds })
      );

      return newIds;
    });
  };

  useEffect(() => {
    const handlePokemonChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        remote1: number;
        remote2: number;
        remote3: number;
      }>;
      setPokemonIds(customEvent.detail);
    };

    window.addEventListener("changePokemon", handlePokemonChange);

    return () => {
      window.removeEventListener("changePokemon", handlePokemonChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={changePokemon}>
        Cambiar Pokémon
      </button>
      <div className={styles.pokemonContainer}>
        <RemotePokemon1 id={pokemonIds.remote1} />
        <RemotePokemon2 id={pokemonIds.remote2} />
        <RemotePokemon3 id={pokemonIds.remote3} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
