import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductPagination } from "../actions/productsAction";
import { useAlert } from "react-alert";
import Products from "./products/Products";
import Pagination from "react-js-pagination";
import {  setPageIndex,  updateCategory,  updatePrecio,  updateRating,} from "../slices/productPaginationSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

  const dispatch = useDispatch();

//antes de añadir el componente Loader:
//const { products } = useSelector((state) => state.products);

//después de añadir el componente Loader:
//const {products, loading, error} = useSelector((state) => state.products);


  
  const [precio, setPrecio] = useState([1, 10000]);

  const { categories } = useSelector((state) => state.category);



  const {
    products,
    count,
    pageIndex,
    loading,
    error,
    resultByPage,
    search,
    pageSize,
    precioMax,
    precioMin,
    category,
    rating,
  } = useSelector((state) => state.productPagination);

  const alert = useAlert(); //creamos un objeto de tipo alert
 

  useEffect(() => {
    if (error != null) return alert.error(error);  //añadimos esta condicion de control de errores. el input error se obtiene desde el useSelector
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
  }, [
    dispatch,
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
    dispatch(setPageIndex({ pageIndex: pageNumber }));
  }

  function onChangePrecio(precioEvent) {
    setPrecio(precioEvent);
  }

  function onAfterChange(precioEvent) {
    dispatch(updatePrecio({ precio: precioEvent }));
  }

  function onChangeCategory(cat) {
    dispatch(updateCategory({ category: cat.id }));
  }

  function onChangeStar(star) {
    dispatch(updateRating({ rating: star }));
  }

  //esta consicion ya no se necesita porque ya esta contemplada en el componente 'Products'
  // if(loading)
  // {
  //   return (<Loader);
  // }

  return (
    <Fragment>
      <MetaData titulo={"Los mejores productos online"} />
      <section id="products" className="container mt-5">
        <div className="row">

          {/* Este bloque ya no se necesita porque hemos creado el componente 'Products' */}
          {/* {products
          ? products.map(
            (productElement) => (
            <Product key={productElement.id} product={productElement} col={4} />  )
          )
          : 'No tiene products'
          } */}
          {/* Hasta aqui el segundo commit (crear el product component en la home page) */}


          {/* <Products col={4} products={products} loading={loading} /> */}


          {search ? (
            <React.Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
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

                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Categorias</h4>
                  <ul className="pl-0">
                    {categories.map((cat) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={cat.id}
                        onClick={() => onChangeCategory(cat)}
                      >
                        {cat.nombre}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>

                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={star}
                        onClick={() => onChangeStar(star)}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  <Products col={4} products={products} loading={loading} />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <Products col={4} products={products} loading={loading} />
          )}
        </div>
      </section>

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
