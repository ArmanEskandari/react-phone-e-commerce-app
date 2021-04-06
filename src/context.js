import React, { useEffect, useState } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(detail);

  // we did this because we didn't want to mutate the data.js
  useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(() => tempProducts);
    // setModalOpen(true);
  }, []);

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
    setProducts(tempProducts);
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
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
