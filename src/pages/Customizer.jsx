import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import { reader } from "../config/helpers";

const Customizer = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generateImg, setGenerateImg] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // If product isn't selected (e.g., direct URL access), redirect to products
  React.useEffect(() => {
    if (!snap.selectedProduct && productId) {
      // In a real app, you would fetch the product details using the ID
      // For now, we'll use the productId to set a dummy product
      state.selectedProduct = {
        id: parseInt(productId),
        name: `T-Shirt #${productId}`,
        price: 29.99,
        defaultColor: "#ffffff"
      };
    }
  }, [productId, snap.selectedProduct]);

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGenerateImg(false);
      const response = await fetch("http://localhost:8081/users/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGenerateImg(true);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]; 
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
    }
    
    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generateImg={generateImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    state.addToCart({ size, quantity });
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editors-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=""
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* Right-side panel for product details and cart actions */}
          <motion.div
            className="absolute top-0 right-0 z-10 bg-white p-5 rounded-l-lg shadow-lg h-screen w-80"
            {...slideAnimation("right")}
          >
            <h2 className="text-2xl font-bold mb-2">{snap.selectedProduct?.name}</h2>
            <p className="text-xl mb-6">${snap.selectedProduct?.price.toFixed(2)}</p>
            
            {/* Size selector */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
              <div className="flex space-x-2">
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 border rounded-md ${
                      size === s 
                        ? "bg-blue-500 text-white" 
                        : "bg-white text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Add to Cart
              </button>
              
              <button
                onClick={() => navigate("/products")}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-md"
              >
                Back to Products
              </button>
              
              <button
                onClick={() => (state.intro = true)}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-md"
              >
                Back to Home
              </button>
            </div>
          </motion.div>

          {/* FILTER TABS */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
