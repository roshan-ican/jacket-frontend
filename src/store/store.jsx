// Example using Context API
import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  products: [],
  cart: [],
  customizations: {}
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, {
          ...action.payload,
          id: Date.now(),
        }],
      };
    case 'SAVE_CUSTOMIZATION':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          [action.payload.productId]: action.payload.customization
        }
      };
    // Add more cases for other actions
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
