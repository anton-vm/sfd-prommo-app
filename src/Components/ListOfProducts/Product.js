import React, { useState, useEffect } from "react";
import moment from "moment";
import style from "./Product.module.css";

const Product = ({ el, addPromo, toggleCart, isCartOpen }) => {
  const add = () => {
    addPromo(el.id);
    if (!isCartOpen) {
      toggleCart();
    }
  };

  // okInitiator: false,
  // okBrandManager: false,
  // okFinance: false,
  // okBrandConfirm: false,
  // okSalesAccept: false,
  // okSalesConfirm: false,
  // okAnalitic: false,
  // okHeadSales: false,
  // okHeadMarketing: false,

  
  const status =() => {
    if (el.signature.okHeadMarketing) {return "Акція погоджена"};
    if (el.signature.okHeadSales) {return "Акція погоджена"};
    if (el.signature.okAnalitic) {return "Продукція є для акції"};
    if (el.signature.okSalesConfirm) {return "Мережа погодила"};
    if (el.signature.okSalesAccept) {return "Узгоджується із мережею"};
    if (el.signature.okBrandConfirm) {return "Погоджено для запуску в мережі"};
    if (el.signature.okFinance) {return "Пораховано"};
    if (el.signature.okBrandManager) {return "Відправлена на прорахунок"};
    if (!el.signature.okBrandManager) {return "Акція створена"};
  }

  const statusColor =() => {
    if (el.signature.okHeadMarketing) {return "product-line__darkGreen"};
    if (el.signature.okHeadSales) {return "product-line__forestGreen"};
    if (el.signature.okAnalitic) {return "product-line__springGreen"};
    if (el.signature.okSalesConfirm) {return "product-line__paleGreen"};
    if (el.signature.okSalesAccept) {return "product-line__moccasin"};
    if (el.signature.okBrandConfirm) {return "product-line__indigo"};
    if (el.signature.okFinance) {return "product-line__thistle"};
    if (el.signature.okBrandManager) {return "product-line__orchid"};
    if (!el.signature.okBrandManager) {return ""};
  }

  const daysToStart = Math.ceil((el.promoStart-Date.now())/86400000)

const alarmLight =() => {
  if (daysToStart<60) {
    return "blink"
  }
}

  
  return (
    <tr className={`product-line ${daysToStart<60 && "blink"}`} onClick={add} id="blick">
      {/* <td className={style.item}>{moment(el.month).format("MMM YY")}</td> */}
      <td className={`product-item ${statusColor()}`}>{daysToStart} днів</td>
      <td className={style.item}>{moment(el.promoStart).format("ll")}</td>
      <td className={style.item}>{moment(el.promoEnd).format("ll")}</td>
      <td className={style.itemChain}>{el.chain}</td>
      <td className={style.item}>{el.tradeMark}</td>
      <td className={style.itemStatus}>{status()}</td>
      {/* <td className={style.item}>
        {
          // <button className={style.button} onClick={add}>
          //   Більше
          // </button>
        }
      </td> */}
    </tr>
  );
};

export default Product;
