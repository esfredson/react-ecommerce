import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { productByIdReducer } from "./slices/productByIdSlice";
import { productPaginationReducer } from "./slices/productPaginationSlice";
import { categoryReducer } from "./slices/categorySlice";
import { securityReducer } from "./slices/securitySlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    product: productByIdReducer, // registramos este nuevo reducer
    productPagination: productPaginationReducer, // registramos el pagination reducer
    category: categoryReducer, // registramos el category reducer
    security: securityReducer  // registramos el security reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
