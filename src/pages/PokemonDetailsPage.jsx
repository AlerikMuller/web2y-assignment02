import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PokemonDetailsPage() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon details.");
                }

                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        void fetchPokemon();
    }, [name]);

    if (loading) {
        return <p>Loading Pokémon details...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!pokemon) {
        return <p>No Pokémon found.</p>;
    }

    const artwork =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon.sprites?.front_default;

    return (
        <section className="page">
            <Link to="/" className="back-link">
                ← Back to Pokédex
            </Link>

            <div className="details-section">
                <h1>{capitalize(pokemon.name)}</h1>

                <img
                    src={artwork}
                    alt={pokemon.name}
                    className="pokemon-image"
                />

                <p><strong>Height:</strong> {pokemon.height}</p>
                <p><strong>Weight:</strong> {pokemon.weight}</p>

                <div>
                    <strong>Types:</strong>
                    <ul>
                        {pokemon.types.map((typeInfo) => (
                            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <strong>Abilities:</strong>
                    <ul>
                        {pokemon.abilities.map((abilityInfo) => (
                            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <strong>Stats:</strong>
                    <ul>
                        {pokemon.stats.map((statInfo) => (
                            <li key={statInfo.stat.name}>
                                {statInfo.stat.name}: {statInfo.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}