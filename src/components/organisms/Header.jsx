import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useAuth } from './AuthContext';
import logoImg from '../../assets/logo.png';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="top-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Logo Nexus Gaming" className="logo-header" />
        </Link>

        <div className="search-container">
          <Input placeholder="Buscar..." />
          <Button className="btn-outline">Buscar</Button>
        </div>

        <div className="user-actions">
          {user ? (
            <>
              <span className="user-saludo">Hola, {user.nombre}</span>
              <Button className="btn-outline" onClick={handleLogout}>Cerrar sesión</Button>
            </>
          ) : (
            <>
              <Button className="btn-outline" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
              <Button className="btn-primary-sm" onClick={() => navigate('/registro')}>
                Crear Cuenta
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
