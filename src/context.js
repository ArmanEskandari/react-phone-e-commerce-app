import React, { useEffect, useState } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [detail] = useState(detailProduct);

  // we did this because we didn't want to mutate the data.js
  useEffect(() => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(() => tempProducts);
  }, []);

  const handleDetail = () => {
    console.log("hello from detail");
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
