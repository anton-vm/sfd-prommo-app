import React from "react";
import style from "./salesTable.module.css"
import SalesTableItem from './SalesTableItem'
import warehouse from '../db/warehouse.json'

const SalesTable = () => {

    const filterProduct = () => {
     return   warehouse.filter(item => (Number(item.BBPercent) > 0) & (Number(item.BBPercent) < 56 ))
    }

console.log(filterProduct())

  return (
    <div>
      <table className={style.tableSales}>
        <thead>
          <tr>
            <th>Вибрати</th>
            <th>Продукт</th>
            <th>% до кінця</th>
            <th>Кінцева дата</th>
            <th>Ціна звична</th>
            <th>% знижки</th>
            <th>Ціна зі знижкою</th>
            <th>Кількість</th>
          </tr>
        </thead>
        <tbody>
            {filterProduct().map(el => <SalesTableItem product={el} key={el.index}/>)}

        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
