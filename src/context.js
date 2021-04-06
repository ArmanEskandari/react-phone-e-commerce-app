import React, { useEffect, useState } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);

  // we did this because we didn't want to mutate the data.js
  useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(() => tempProducts);
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

  const addToCart = () => {
    console.log("hello from add to cart");
  };

  return (
    <ProductContext.Provider
      value={{ products, detail, handleDetail, addToCart }}>
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
