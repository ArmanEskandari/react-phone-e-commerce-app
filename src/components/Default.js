import React from "react";

export default function Default(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center text-uppercase pt-5">
          <h1 className="display-3">404</h1>
          <h1>error</h1>
          <h2>page not found</h2>
          <h4>
            the requested url
            <span className="text-danger">{props.location.pathname}</span> was
            not found
          </h4>
        </div>
      </div>
    </div>
  );
}
