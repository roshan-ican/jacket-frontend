import React from "react";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import state from "../store";
import { motion } from "framer-motion";
import { fadeAnimation } from "../config/motion";
import { CustomButton } from "../components";

const Cart = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const totalAmount = snap.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      className="cart-container max-w-5xl mx-auto py-10 px-4"
      {...fadeAnimation}
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {snap.cart.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <CustomButton
            type="filled"
            title="Continue Shopping"
            handleClick={() => navigate("/products")}
            customStyles="px-6 py-3 font-bold"
          />
        </div>
      ) : (
        <>
          <div className="cart-items space-y-4">
            {snap.cart.map((item) => (
              <div
                key={item.id}
                className="cart-item bg-white rounded-lg shadow-md p-4 flex flex-wrap"
              >
                <div className="item-image h-32 w-32 bg-gray-100 rounded-md mr-4 relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.isLogoTexture && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={item.logoDecal}
                        alt="Logo"
                        className="max-h-16 max-w-16"
                      />
                    </div>
                  )}
                </div>

                <div className="item-details flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="price-qty">
                      <p className="text-gray-800">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="item-actions w-full mt-3 flex justify-end">
                  <button
                    onClick={() => state.removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl">Subtotal:</span>
              <span className="text-2xl font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <CustomButton
                type="filled"
                title="Checkout"
                handleClick={() => alert("Checkout functionality coming soon!")}
                customStyles="px-6 py-3 font-bold flex-1"
              />
              <CustomButton
                type="outline"
                title="Continue Shopping"
                handleClick={() => navigate("/products")}
                customStyles="px-6 py-3 font-bold flex-1"
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
