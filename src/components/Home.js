import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductPagination } from "../actions/productsAction";
import { useAlert } from "react-alert";
import Products from "./products/Products";
import Pagination from "react-js-pagination";
import { setPageIndex, updateCategory, updatePrecio, updateRating } from "../slices/productPaginationSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// creo el objeto Slider y el objeto Range desde la libreria rc-slider
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

  const dispatch = useDispatch();

  // seteo a nivel local la variable de estado precio
  const [precio, setPrecio] = useState([1, 10000]);

  // obtengo la lista de categorias del store global
  const { categories } = useSelector((state) => state.category);

  // el 'useSelector' productPagination me devuelve los valores
  // de las variables de estado relacionadas con la paginacion
  const { products, count, pageIndex, loading, error, resultByPage,
          search, pageSize, precioMax, precioMin, category, rating
        } = useSelector((state) => state.productPagination);

  const alert = useAlert(); //creamos un objeto de tipo alert

  useEffect(() => {
     //añadimos esta condicion de errores cuyo estado se obtiene desde el useSelector
    if (error != null) return alert.error(error); 
    dispatch(getProductPagination({
        pageIndex: pageIndex,
        pageSize: pageSize,
        resultByPage: resultByPage,
        search: search,
        precioMax: precioMax,
        precioMin: precioMin,
        categoryId: category,
        rating: rating,
      })
    );
  }, [dispatch,
    error,  //cada vez que cambie el estado 'error' se va a volver a ejecutar la logica del useEffect
    alert,  //cada vez que cambie el estado 'alert' se va a volver a ejecutar la logica del useEffect
    search,
    pageSize,
    resultByPage,
    pageIndex,
    precioMax,
    precioMin,
    category,
    rating,
  ]);

  function setCurrentPageNo(pageNumber) {
    dispatch(setPageIndex(
      { pageIndex: pageNumber }
    ));
  }

  //actualiza la variable de estado local precio
  function onChangePrecio(precioEvent) {
    setPrecio(precioEvent);
  }

  // actualiza la variable de estado global precio
  function onAfterChange(precioEvent) {
    dispatch(updatePrecio(
      { precio: precioEvent }
    ));
  }

  // dispara la busqueda de esa categoria seleccionada
  function onChangeCategory(cat) {
    dispatch(updateCategory(
      { category: cat.id }
    ));
  }

  // dispara la busqueda del rating seleccionado (numero de estrellas)
  function onChangeStar(star) {
    dispatch(updateRating(
      { rating: star }
    ));
  }

  return (
    <Fragment>
      <MetaData titulo={"Los mejores productos online"} />
      <section id="products" className="container mt-5">
        <div className="row">

        {search
          ?
          (
            <React.Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">

                <div className="px-5">
                  {/* el componente Range es importado desde rc-slider */}
                  <Range
                    marks={{ 1: `$1`, 10000: `$10000` }}
                    min={1}
                    max={10000}
                    defaultValue={[1, 10000]}
                    tipFormatter={(value) => `$${value}`}
                    value={precio}
                    tipProps={{ placement: "top", visible: true }}
                    onChange={onChangePrecio}
                    onAfterChange={onAfterChange}
                  />
                </div>

                {/* bloque de renderizacion de la lista de categorias */}
                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Categorias</h4>
                  <ul className="pl-0">
                    {
                      categories.map((cat) => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={cat.id}
                          onClick={() => onChangeCategory(cat)}
                        >
                          {cat.nombre}
                        </li>
                      ))
                    }
                  </ul>
                </div>

                {/* bloque de renderizacion de los ratings obtenidos */}
                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>

                  {/* este bucle va a trabajar 5 veces, pintando cada estrella */}
                  <ul className="pl-0">
                    {
                      [5,4,3,2,1].map(star => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={star}
                          onClick={() => onChangeStar(star)}
                        >
                          <div className="rating-outer">
                            <div className="rating-inner" style={{width: `${star*20}%`}}></div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>

              </div>

              <div className="col-6 col-md-9">
                <div className="row">
                  <Products col={4} products={products} loading={loading} />
                </div>
              </div>

            </React.Fragment>
          )
          :
          (<Products col={4} products={products} loading={loading} />)
        }
        </div>
      </section>

      {/* introduccion de las propiedades del componente Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={pageIndex}
          itemsCountPerPage={pageSize}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={">"}
          prevPageText={"<"}
          firstPageText={"<<"}
          lastPageText={">>"}
          item-class="page-item"
          linkClass="page-link"
        />
      </div>
    </Fragment>
  );
};

export default Home;
