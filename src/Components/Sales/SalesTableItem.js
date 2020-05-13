import React from "react";
import price from '../db/priceAndProduct.json'

const SalesTableItem = ({product}) => {

const code = product.barCode

const price1 = price.filter(el => el.barCode === code)
const priceFin =() =>{
    if (price1.length===0) {return}
    else
    {return price1[0].supermarketPrice}
    }

const percentOfDiscount = () => {
    if(product.BBPercent>=40) {return 25}
    if(product.BBPercent>=30 & product.BBPercent<=39) {return 35}
    if(product.BBPercent>=20 & product.BBPercent<=29) {return 50}
    if(product.BBPercent>=10 & product.BBPercent<=19) {return 70}
    if(product.BBPercent<=9) {return 90}
}

const priceWithDiscount = () => {
    if (!priceFin()) {return}
    return ((priceFin()-(priceFin()*percentOfDiscount()/100)).toFixed(2))
}




  return (
    <tr >
      <td><input type="checkbox"/></td>
      <td>{product.name}</td>
      <td>{product.BBPercent}</td>
  <td>{product.BBDate}</td>
      <td>{priceFin()}</td>
      <td>{percentOfDiscount()}</td>
      <td>{priceWithDiscount()}</td>
      <td>{product.quantity}</td>
    </tr>
  );
};

export default SalesTableItem;
