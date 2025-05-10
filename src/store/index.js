// store/index.js
import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
  
  // E-commerce properties
  selectedProduct: null,
  cart: [],
  
  // Methods
  addToCart(customization) {
    const item = {
      id: Date.now(),
      productId: this.selectedProduct?.id,
      name: this.selectedProduct?.name,
      price: this.selectedProduct?.price,
      color: this.color,
      isLogoTexture: this.isLogoTexture,
      isFullTexture: this.isFullTexture,
      logoDecal: this.logoDecal,
      fullDecal: this.fullDecal,
      quantity: customization?.quantity || 1,
      size: customization?.size || "M",
      ...customization
    };
    
    this.cart.push(item);
  },
  
  removeFromCart(itemId) {
    const index = this.cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
});

export default state;
