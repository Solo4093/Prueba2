import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          <li><NavLink to="/categorias">Categorías</NavLink></li>
          <li><NavLink to="/ofertas">Ofertas</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>

        <Link to="/carrito" className="btn-cart">
          🛒 Carrito <span>$0</span>
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer id="footer">
      <p>&copy; {new Date().getFullYear()} Nexus Gaming - Todos los derechos reservados</p>
    </footer>
  );
}