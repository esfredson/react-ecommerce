import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/product/ProductDetail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./actions/categoryAction";
import Login from "./components/security/Login";
import Register from "./components/security/Register";

function App() {

  // obtenemos el listado de categorias al mas alto nivel de la aplicacion.
  // no necesitamos que se muestren en el App, sólo que se almacenen en el store global.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* agrego esta nueva ruta para obtener el detalle de producto */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
