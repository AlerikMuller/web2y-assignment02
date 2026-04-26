import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import Pagination from "../components/Pagination";

const LIMIT = 12;

export default function PokedexPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [page, setPage] = useState(0);
    const [loadingList, setLoadingList] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
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
                setSelectedPokemon(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingList(false);
            }
        }

        fetchPokemonPage();
    }, [page]);

    async function handleSelectPokemon(pokemon) {
        try {
            setLoadingDetails(true);
            setError("");

            const response = await fetch(pokemon.url);

            if (!response.ok) {
                throw new Error("Failed to fetch Pokémon details.");
            }

            const data = await response.json();
            setSelectedPokemon(data);

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingDetails(false);
        }
    }

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
                <PokemonList
                    pokemon={pokemonList}
                    onSelect={handleSelectPokemon}
                    selectedPokemonName={selectedPokemon?.name}
                />
            )}

            <Pagination
                page={page}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />

            <div className="details-section">
                <h2>Selected Pokémon</h2>
                <PokemonDetails pokemon={selectedPokemon} loading={loadingDetails} />
            </div>
        </section>
    );
}