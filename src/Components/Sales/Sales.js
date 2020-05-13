import React from "react";
import SalesTable from './SalesTable'

const Sales = ({toggleSales}) => {
  return (
    <div className="overlay-modal">
      <div className="card">
        <div className="banner">
        <div className="close_icon" onClick={toggleSales}></div>
          <h1>Розпродаж строкового товару</h1>
        </div>
        <fieldset>
          <legend>Продукція для розпродажу</legend>

          <SalesTable/>



        </fieldset>
      </div>
    </div>
  );
};

export default Sales;
