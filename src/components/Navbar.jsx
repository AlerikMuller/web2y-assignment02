import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="navbar">
            <Link to="/" className="logo">
                Pokédex
            </Link>

            <nav className="nav-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
                    Pokedex
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
                    About
                </NavLink>
            </nav>
        </header>
    );
}