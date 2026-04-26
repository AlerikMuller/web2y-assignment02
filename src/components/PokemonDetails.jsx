export default function PokemonDetails({ pokemon, loading }) {
    if (loading) {
        return <div className="details-card">Loading Pokémon details...</div>;
    }

    if (!pokemon) {
        return <div className="details-card">Select a Pokémon to see details.</div>;
    }

    return (
        <div className="details-card">
            <h2 className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>

            <img
                src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                }
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
    );
}