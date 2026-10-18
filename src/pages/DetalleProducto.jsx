import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../components/atoms/Button';
import Precio from '../components/atoms/Precio';
import { descuentoDe, obtenerConsolas, precioFinal } from '../data/consolas';

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const consola = obtenerConsolas().find((c) => c.id === parseInt(id));

  if (!consola) {
    return (
      <section id="content">
        <Container className="text-center text-white">
          <h2>Producto no encontrado</h2>
          <Button className="btn-outline" onClick={() => navigate('/productos')}>
            Volver a productos
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section id="content">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <div className="img-box" style={{ height: 320 }}>
              <img className="img-obj" src={consola.imagen} alt={consola.nombre} />
            </div>
          </Col>
          <Col md={6} className="text-white">
            <h2>{consola.nombre}</h2>
            <p>Categoría: {consola.categoria}</p>
            <p>Stock disponible: {consola.stock}</p>
            <Precio
              precio={precioFinal(consola)}
              precioOriginal={consola.precio}
              descuento={descuentoDe(consola)}
            />
            <Button className="btn-red">Agregar al carrito</Button>{' '}
            <Button className="btn-outline" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}