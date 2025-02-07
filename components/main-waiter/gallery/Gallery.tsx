// import React from "react";
// import imagesData from "../../general/jsons/tables/tables.json";
// import "./gallery.css";
// import { useNavigate } from "react-router-dom";

// interface galleryProps {
//   nextRoute?: string;
// }
// const ImageGallery: React.FC<galleryProps> = ({ nextRoute = "/" }) => {
//   const navigate = useNavigate();

//   const handleNext = (table: number) => () => {
//     if (nextRoute) {
//       navigate(nextRoute + `/${table}`);
//     }
//   };
//   return (
//     <div className="grid-container">
//       {imagesData.tables.map((tables) => (
//         <div
//           className="grid-item"
//           key={tables.id}
//           onClick={handleNext(tables.id)}
//         >
//           <div className="image-container">
//             <img src={tables.url} alt={tables.alt} className="img-fluid" />
//             <div className="overlay">
//               <span className="image-id">{tables.id}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageGallery;

import React, { useEffect, useState } from "react";
import { getAllTables } from "../../../services/tablesService";
import "./gallery.css";
import { useNavigate } from "react-router-dom";

interface galleryProps {
  nextRoute?: string;
}
const ImageGallery: React.FC<galleryProps> = ({ nextRoute = "/" }) => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<any[]>([]); // Estado para almacenar las mesas
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos de las mesas desde el servicio
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAllTables();
        setTables(data); // Guardar datos en el estado
        setLoading(false);
      } catch (err) {
        setError("Error cargando las mesas");
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  // Función para manejar la navegación al hacer clic en una mesa
  const handleNext = (tableId: number) => () => {
    if (nextRoute) {
      navigate(`${nextRoute}/${tableId}`);
    }
  };

  if (loading) return <h1>Cargando mesas...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div className="grid-container">
      {tables.map((table) => (
        <div
          className="grid-item"
          key={table.id_table}
          onClick={handleNext(table.id_table)}
        >
          <div className="image-container">
            <img
              src={"/img/chair.svg"}
              alt={`Mesa ${table.number}`}
              className="img-fluid"
            />
            <div className="overlay">
              <span className="image-id">{table.id_table}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
