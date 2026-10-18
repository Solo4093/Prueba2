import { useState } from 'react';
const categorias = obtenerCategorias();
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { obtenerConsolas, crearConsola, actualizarConsola } from '../data/consolas';
import { obtenerCategorias } from '../data/categorias';

const vacio = {
  nombre: '',
  precio: '',
  categoria: '',
  stock: '',
  imagen: '',
  oferta: false,
};

export default function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? obtenerConsolas().find((c) => c.id === parseInt(id)) : null;

  const [datos, setDatos] = useState(existente ?? vacio);
  const [errores, setErrores] = useState({});
  const categorias = obtenerCategorias();

  if (id && !existente) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value });
  };

  const validar = () => {
    const nuevos = {};
    if (datos.nombre.trim().length < 3) nuevos.nombre = 'El nombre debe tener al menos 3 caracteres';
    if (!(Number(datos.precio) > 0)) nuevos.precio = 'El precio debe ser mayor a 0';
    if (datos.categoria.trim() === '') nuevos.categoria = 'Selecciona una categoría';
    if (!Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0) {
      nuevos.stock = 'El stock debe ser un número entero de 0 o más';
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const producto = {
      nombre: datos.nombre.trim(),
      precio: Number(datos.precio),
      categoria: datos.categoria.trim(),
      stock: Number(datos.stock),
      imagen: datos.imagen.trim(),
      oferta: datos.oferta,
    };

    if (existente) {
      actualizarConsola(existente.id, producto);
    } else {
      crearConsola(producto);
    }
    navigate('/admin/productos');
  };

  return (
    <>
      <h2>{existente ? 'Editar producto' : 'Nuevo producto'}</h2>

      <form className="form-admin" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <Input name="nombre" value={datos.nombre} onChange={handleChange} />
        {errores.nombre && <p className="error-texto">{errores.nombre}</p>}

        <label>Precio (CLP)</label>
        <Input type="number" name="precio" value={datos.precio} onChange={handleChange} />
        {errores.precio && <p className="error-texto">{errores.precio}</p>}

        <label>Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={datos.categoria}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errores.categoria && <p className="error-texto">{errores.categoria}</p>}

        <label>Stock</label>
        <Input type="number" name="stock" value={datos.stock} onChange={handleChange} />
        {errores.stock && <p className="error-texto">{errores.stock}</p>}

        <label>Imagen (URL o ruta)</label>
        <Input name="imagen" value={datos.imagen} onChange={handleChange} />

        <label className="check-oferta">
          <input type="checkbox" name="oferta" checked={datos.oferta} onChange={handleChange} />
          {' '}Producto en oferta
        </label>

        <div>
          <Button type="submit" className="btn-red admin-btn">Guardar</Button>{' '}
          <Button className="btn-outline admin-btn" onClick={() => navigate('/admin/productos')}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
}