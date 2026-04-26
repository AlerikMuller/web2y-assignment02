export default function PokemonList({ pokemon, onSelect, selectedPokemonName }) {
    return (
        <div className="pokemon-list">
            {pokemon.map((item) => (
                <button
                    key={item.name}
                    className={`pokemon-list-item ${selectedPokemonName === item.name ? "selected" : ""}`}
                    onClick={() => onSelect(item)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}