import React from "react";
import ForSaleList from "../components/ForSaleList";
import SaleCategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

const Marketplace = () => {
  return (
    <div className="container">
      <SaleCategoryMenu /> 
      <ForSaleList />
    </div>
  );
};

export default Marketplace;