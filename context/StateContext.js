import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import product from "../sanityeecommerce/schemas/product";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQty, settotalQty] = useState(0);
  const [qty, setqty] = useState(1);

  let foundProduct;
  let index;

  // On add Function
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    settotalQty((previousQty) => previousQty + quantity);
    settotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantity
    );
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setcartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setcartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty}${product.name} added successfully`);
  };

//On remove function.......
const onRemove=(product)=>{
  foundProduct= cartItems.find((item)=>item._id===product._id);
  const newCartItems= cartItems.filter((item)=>item._id!==product._id);
  settotalPrice((previousTotalPrice)=>previousTotalPrice-foundProduct.price*foundProduct.quantity);
  settotalQty((previousQty)=>previousQty-foundProduct.quantity);
  setcartItems(newCartItems); 
}




// Change cart items function................
  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((product) => product._id === id);
    // index =cartItems.findIndex((item)=> item._id===id)
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setcartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      settotalPrice(
        (previousTotalPrice) => previousTotalPrice + foundProduct.price
      );
      settotalQty((previousQty) => previousQty + 1);
    } else if (value ==="dec") {
      if (foundProduct.quantity > 1) {
        setcartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        settotalPrice(
          (previousTotalPrice) => previousTotalPrice - foundProduct.price
        );
        settotalQty((previousQty) => previousQty - 1);
      }
    }
  };

  const incQty = () => {
    setqty((previousQty) => previousQty + 1);
  };
  const decQty = () => {
    setqty((previousQty) => {
      if (previousQty - 1 < 1) return 1;
      else return previousQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        setshowCart,
        toggleCartItemQty,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
