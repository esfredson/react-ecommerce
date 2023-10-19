import React from 'react'
import Loader from '../layout/Loader'
import Product from '../product/Product'

//creamos el componente 'Products' para contener todos los productos
const Products = ({products, col, loading}) => {
    if(loading)
        return <Loader />

  return (  
        <React.Fragment>        
            {
                products
                ? products.map(
                    productElement => (
                        <Product key={productElement.id} product={productElement} col={col} />
                    )
                )
                : <Loader />
            }
        </React.Fragment>
  )
}

export default Products;