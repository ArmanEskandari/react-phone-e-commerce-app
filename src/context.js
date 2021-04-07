import React, { useEffect, useState } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(detail);
  const [cartSubTotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // we did this because we didn't want to mutate the data.js
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    addTotals();
  }, [products, cart]);

  const getProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const eachItem = { ...item };
      tempProducts = [...tempProducts, eachItem];
    });
    setProducts(tempProducts);
  };

  const getItem = (id) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    console.log("clicked item", id);
    const product = getItem(id);
    setDetail(product);
  };

  const addToCart = (id) => {
    console.log(modalOpen);
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts([...tempProducts]);
    setCart([...cart, product]);
  };

  const openModal = (id) => {
    setModalOpen(true);
    const product = getItem(id);
    setModalDetail(product);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;
    setCart([...tempCart]);
  };

  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    product.total = product.count * product.price;
    setCart([...tempCart]);
    if (product.count === 0) {
      removeItem(id);
    }
  };

  const removeItem = (id) => {
    const tempProducts = [...products];
    const tempCart = cart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    setCart([...tempCart]);
  };

  const clearCart = () => {
    setCart([]);
    getProducts();
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 1.09;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubtotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        detail,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        modalOpen,
        modalDetail,
        removeItem,
        increment,
        decrement,
        clearCart,
        cart,
        cartSubTotal,
        cartTax,
        cartTotal,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
