import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";

const LIMIT = 12;

export default function PokedexPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [loadingList, setLoadingList] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPokemonPage() {
            try {
                setLoadingList(true);
                setError("");

                const offset = page * LIMIT;
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon list.");
                }

                const data = await response.json();
                setPokemonList(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingList(false);
            }
        }

        void fetchPokemonPage();
    }, [page]);

    function handlePrevious() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    function handleNext() {
        setPage(page + 1);
    }

    return (
        <section className="page">
            <h1>Pokédex</h1>

            {error && <p className="error-message">{error}</p>}

            {loadingList ? (
                <p>Loading Pokémon...</p>
            ) : (
                <PokemonList pokemon={pokemonList} />
            )}

            <Pagination
                page={page}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
        </section>
    );
}