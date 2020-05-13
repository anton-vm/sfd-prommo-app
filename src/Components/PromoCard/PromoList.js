import React from "react";
import style from "./PromoCard.module.css";

const PromoList = ({el}) => {

  return (
    <div className={style.list}>
      <span className={style.listItemSku}>{el.sku}</span>
      <span className={style.listItem}>{el.quantityForCompensation} шт</span>
      {/* <span className={style.listItem}>{el.statisticSells}</span> */}
    </div>
  );
};

export default PromoList;
 