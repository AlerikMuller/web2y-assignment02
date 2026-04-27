import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";

const LIMIT = 12;

export default function PokedexPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
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
                setTotalPages(Math.ceil(data.count / LIMIT));
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
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    }

    function handleGoToPage(targetPage) {
        if (targetPage >= 0 && targetPage < totalPages) {
            setPage(targetPage);
        }
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
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onGoToPage={handleGoToPage}
            />
        </section>
    );
}