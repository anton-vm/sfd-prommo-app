import React, { useState, useEffect, createRef } from "react";
import PromoCard from "../PromoCard/PromoCard";
import style from "./Product.module.css";
import Product from "./Product";
import './Test.css'

const TableOfProducts =({cardsArr, addPromo, toggleCart, isCartOpen, sortType, cardPromo, sortFunction, sortData}) =>{





return (
  <div className="testbox">
    <table >
    <thead   >
      <tr className="table sortTable" id="sortTable" >
        <th className={style.item} data-sort="month" onClick={sortType} >
          Днів до акції
        </th>
        <th className={style.item} data-sort="start" onClick={sortType} >
          Початок акції
        </th>
        <th className={style.item} data-sort="end" onClick={sortType}>
          Кінець акції
        </th>
        <th
          className={style.itemChain}
          data-sort="chain"
          onClick={sortType}
        >
          Мережа
        </th>
        <th className={style.item} data-sort="mark" onClick={sortType}>
          Торгова марка
        </th>
        <th className={style.item} data-sort="status" >
          Статус
        </th>

        {/* <th className={style.item}>Більше</th> */}
      </tr>
    </thead>

    <tbody className={style.bodytable}>
      {sortData().map((el) => (
        <Product
          el={el}
          key={el.id}
          addPromo={addPromo}
          toggleCart={toggleCart}
          isCartOpen={isCartOpen}
          
        />
      ))}
      
    {isCartOpen && <PromoCard
    key={cardPromo.id}
    cardPromo={cardPromo}
    isCartOpen={isCartOpen}
    toggleCart={toggleCart}
  />}
    </tbody>
  </table>
  </div>
)
    }
export default TableOfProducts