import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  const default_image = "./images/default_product.png";

  return (
    // variable de entrada col (numero de columnas)
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          // primera imagen de la coleccion de productos
          src={product.images[0] ? product.images[0].url : default_image}
          alt=""
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
              {/* nombre del producto */}
            <Link>{product.nombre}</Link>
          </h5>
          {/* rating del producto */}
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>
             {/* reviews del producto */}
            <span id="no_of_reviews">( {product.numeroReviews} Reviews)</span>
          </div>
            {/* precio del producto */}
          <p className="card-text">$ {product.precio}</p>
          <Link
            id="view_btn"
            className="btn btn-block"
            to={`/product/${product.id}`} //agrego esta logica para acceder al compoenente 'ProductDetail'
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
