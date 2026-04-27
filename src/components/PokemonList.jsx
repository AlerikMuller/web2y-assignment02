import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const typeColors = {
    grass: "#8BCB7B",
    poison: "#B07CC6",
    fire: "#F5A24C",
    water: "#5AA0E6",
    bug: "#8FD36B",
    normal: "#BDBDBD",
    electric: "#F4D23C",
    ground: "#D2B074",
    fairy: "#F2A7D8",
    fighting: "#C97A5B",
    psychic: "#F08BC3",
    rock: "#BCA36B",
    ghost: "#7C6BC4",
    ice: "#8DD8E8",
    dragon: "#6C8BE8",
    dark: "#6E6A6A",
    steel: "#9AA5B1",
    flying: "#90B9FF",
};

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PokemonList({ pokemon }) {
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        async function fetchCardDetails() {
            try {
                const results = await Promise.all(
                    pokemon.map(async (item) => {
                        const response = await fetch(item.url);
                        const data = await response.json();

                        const artwork = data.sprites?.other?.["official-artwork"];
                        const sprite = artwork?.front_default || data.sprites?.front_default || "";

                        return {
                            name: data.name,
                            id: data.id,
                            sprite,
                            primaryType: data.types?.[0]?.type?.name || "normal",
                        };
                    })
                );

                if (!ignore) {
                    setPokemonDetails(results);
                }
            } catch {
                if (!ignore) {
                    setPokemonDetails([]);
                }
            }
        }

        if (pokemon.length > 0) {
            void fetchCardDetails();
        }

        return () => {
            ignore = true;
        };
    }, [pokemon]);

    return (
        <div className="pokemon-grid">
            {pokemonDetails.map((item) => (
                <button
                    key={item.name}
                    className="pokemon-card"
                    style={{ backgroundColor: typeColors[item.primaryType] || "#cccccc" }}
                    onClick={() => navigate(`/pokemon/${item.name}`)}
                >
                    <div className="pokemon-card-text">
                        <span className="pokemon-number">#{item.id}</span>
                        <h3>{capitalize(item.name)}</h3>
                    </div>

                    <img
                        src={item.sprite}
                        alt={item.name}
                        className="pokemon-card-image"
                    />
                </button>
            ))}
        </div>
    );
}