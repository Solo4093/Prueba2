import { useState } from 'react';
import CardConsola from '../components/molecules/CardConsola';
import { obtenerConsolas, crearConsola } from '../data/consolas';

// Cantidad de consolas que se muestran en el inicio.
const MAX_HOME = 3;

export default function Home() {
  const [consolas, setConsolas] = useState(() => obtenerConsolas().slice(0, MAX_HOME));

  return (
    <section id="content">
      <article className="inicio">
        <h2>Bienvenido a Nexus Gaming</h2>
        <p>
          Encuentra y compra las mejores consolas para tus videojuegos favoritos.
          Tenemos Playstation, Xbox y Nintendo.
        </p>
      </article>

      <article className="section-container">
        <h2 className="section-title">Consolas disponibles</h2>
        <p className="section-title">
          En Nexus Gaming puedes encontrar muchas consolas de videojuegos.
        </p>

        <div className="contenedor">
          {consolas.map((item) => (
            <CardConsola
              key={item.id}
              nombre={item.nombre}
              imagen={item.imagen}
              precio={item.precio}
            />
          ))}
        </div>
      </article>
    </section>
  );
}