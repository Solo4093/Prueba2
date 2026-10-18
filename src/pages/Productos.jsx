import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import CardConsola from '../components/molecules/CardConsola';
import Button from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { obtenerConsolas } from '../data/consolas';
import { obtenerCategorias } from '../data/categorias';

export default function Productos({ busqueda = '', onLimpiarBusqueda }) {
  const [consolas] = useState(obtenerConsolas);
  const [categoria, setCategoria] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [orden, setOrden] = useState('');
  const navigate = useNavigate();
  const categorias = obtenerCategorias();

  // La lista filtrada NO es un estado: se calcula en cada render
  let resultado = consolas.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (categoria === '' || c.categoria === categoria) &&
      (precioMax === '' || c.precio <= Number(precioMax)) &&
      (!soloOfertas || c.oferta)
  );

  if (orden === 'menor') resultado = [...resultado].sort((a, b) => a.precio - b.precio);
  if (orden === 'mayor') resultado = [...resultado].sort((a, b) => b.precio - a.precio);

  const limpiarFiltros = () => {
    setCategoria('');
    setPrecioMax('');
    setSoloOfertas(false);
    setOrden('');
    if (onLimpiarBusqueda) onLimpiarBusqueda();
  };

  return (
    <section id="content">
      <div className="section-container">
        <h2 className="section-title">Productos</h2>

        <div className="filtros">
          <Row className="g-3 align-items-end">
            <Col xs={12} md={3}>
              <label>Categoría</label>
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Todas</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Col>

            <Col xs={12} md={3}>
              <label>Precio máximo (CLP)</label>
              <Input
                type="number"
                placeholder="Ej: 600000"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              />
            </Col>

            <Col xs={12} md={3}>
              <label>Ordenar por</label>
              <select
                className="form-select"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              >
                <option value="">Sin orden</option>
                <option value="menor">Precio: menor a mayor</option>
                <option value="mayor">Precio: mayor a menor</option>
              </select>
            </Col>

            <Col xs={12} md={3}>
              <label className="check-filtro">
                <input
                  type="checkbox"
                  checked={soloOfertas}
                  onChange={(e) => setSoloOfertas(e.target.checked)}
                />{' '}
                Solo ofertas
              </label>
              <Button className="btn-outline" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            </Col>
          </Row>
        </div>

        {busqueda.trim() !== '' && (
          <p className="busqueda-activa">Resultados para: "{busqueda}"</p>
        )}
        <p className="busqueda-activa">
          {resultado.length} {resultado.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>

        {resultado.length === 0 ? (
          <p className="section-title">No hay productos que coincidan con tu búsqueda.</p>
        ) : (
          <div className="contenedor">
            {resultado.map((item) => (
              <CardConsola
                key={item.id}
                nombre={item.nombre}
                imagen={item.imagen}
                precio={item.precio}
                onVerDetalle={() => navigate(`/productos/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}