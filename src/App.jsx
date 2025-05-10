import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app transition-all ease-in pt-16"> {/* Added pt-16 for header space */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route 
            path="/customize/:productId" 
            element={
              <>
                <Canvas />
                <Customizer />
              </>
            } 
          />
          <Route path="/cart" element={<Cart />} />
          {/* We can add Checkout later */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
