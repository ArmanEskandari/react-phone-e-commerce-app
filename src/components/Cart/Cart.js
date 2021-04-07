import React, { Fragment } from "react";
import { ProductConsumer } from "../../context";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import EmptyCart from "./EmptyCart";

export default function Cart(props) {
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={props.history} />
              </Fragment>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer>
    </section>
  );
}
