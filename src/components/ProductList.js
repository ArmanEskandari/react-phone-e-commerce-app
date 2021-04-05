import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default function ProductList() {
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            <ProductConsumer>
              {(value) => {
                return value.products.map((product) => (
                  <Product key={product.id} product={product} />
                ));
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>
    </React.Fragment>
    // <Product />
  );
}
