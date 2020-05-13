import React, { useState, useEffect } from "react";
import style from "../PromoCard.module.css";
import priceProduct from "../../db/priceAndProduct.json"

const CalculationItem = ({ el, discount, authorisationOfSku, takePromoData, isTakePromoData, variables }) => {
  const calculation = {
    sku: el.sku,
    priceOrdinar: 0,
    discount: discount,
    time: Date.now(),
    cost: 0,
    chainVariables: 0,
    authorisationOfSku: authorisationOfSku,
    quantityForCompensation: el.quantityForCompensation,
    priceWithDiscount: 0,
    profitability: 0,
    ammountOfSells: 0,
    costOfSells: 0,
    costOfVariables: 0,
    margin: 0,
    amountOfDiscount: 0,
  };

//   takePromoData(formCalculation)

  const [formCalculation, setFormCalculation] = useState(calculation);
  const [itemConfirmed, setItemConfirmed] = useState(false)

  // const [form, setForm] = useState(formCalculation)

//   const price1 = priceProduct.map(el => { if (el.shortName===formCalculation.sku) { return Number(el.supermarketPrice)}})

//  const price = price1.map(el => el && el)

// const price1 = priceProduct.find(el.shortName === formCalculation.sku)

const price1 = priceProduct.filter(el => el.shortName === formCalculation.sku)
const price = price1[0].supermarketPrice

  const priceWithDiscount = (
    price -
    (price * discount) / 100
  ).toFixed(2);
  const profitability = (
    ((Number(price) - formCalculation.cost) /
      Number(price)) *
    100
  ).toFixed(0);
  const ammountOfSells = (el.quantityForCompensation * price).toFixed(0);
  const costOfSells = (el.quantityForCompensation * formCalculation.cost).toFixed(0);
  const costOfVariables = (
    (Number(ammountOfSells) * Number(variables)) /
    100
  ).toFixed(0);
  let margin = (
    Number(ammountOfSells) -
    costOfSells -
    costOfVariables
  ).toFixed(0);
  const amountOfDiscount =
    (el.quantityForCompensation * el.priceOrdinar * (discount / 100)).toFixed(0);



  const inputHandlerNumber = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let margin1 = (
      Number(ammountOfSells) -
      costOfSells -
      costOfVariables
    ).toFixed(0);
    
    setFormCalculation({
      ...formCalculation,
      [name]: Number(value),
      ammountOfSells: ammountOfSells,
      priceOrdinar: price,
      priceWithDiscount: Number(priceWithDiscount),
      profitability: Number(profitability),
      // ammountOfSells: Number(ammountOfSells),
      costOfSells: Number(el.quantityForCompensation * formCalculation.cost),
      costOfVariables: Number(costOfVariables),
      // margin: Number(margin),
      amountOfDiscount: Number(amountOfDiscount),
    });
  };

  const [send, setSend] = useState(false)

  useEffect(() => {
    setFormCalculation({
      ...formCalculation,
      // priceOrdinar: price,
      // priceWithDiscount: Number(priceWithDiscount),
      profitability: (
        ((Number(price) - formCalculation.cost) /
          Number(price)) *
        100
      ).toFixed(0),
      // ammountOfSells: Number(ammountOfSells),
      costOfSells: (Number(el.quantityForCompensation * formCalculation.cost)).toFixed(0),
      // costOfVariables: Number(costOfVariables),
      margin: (
        Number(ammountOfSells) -
        costOfSells -
        costOfVariables
      ).toFixed(0),
      // amountOfDiscount: Number(amountOfDiscount),
    });
  }, [formCalculation.cost, formCalculation.costOfSells])

  useEffect(() => {
    if (send) {

    takePromoData(formCalculation)}
  }, [send])




  const inputSend = (e) => {
    if (e.target.checked) {
      setSend(true)
    }
  }



  return (
    <tr>
      <td className={style.calc__point}>{el.sku}</td>
      <td className={style.calc__point}>{price}</td>
      {/* <td className={style.calc__point}>{discount} %</td> */}
      <td className={style.calc__point}>{priceWithDiscount}</td>
      <td className={style.calc__point}>
        <input
          name="cost"
          onChange={inputHandlerNumber}
          className={style.input}
        />
      </td>
      <td className={style.calc__point}>
        {formCalculation.cost === null ? "внесіть собівартість" : profitability}
        %
      </td>
      <td className={style.calc__point}>{el.quantityForCompensation}</td>
      <td className={style.calc__point}>{ammountOfSells}</td>
      <td className={style.calc__point}>
        {formCalculation.cost === null ? "внесіть собівартість" : costOfSells}
      </td>
      {/* <td className={style.calc__point}>
        <input
          name="chainVariables"
          onChange={inputHandlerNumber}
          // onBlur={inputSend}
          className={style.input}
        />
      </td> */}
      <td className={style.calc__point}>{costOfVariables}</td>
      <td className={style.calc__point}>{margin}</td>
      {/* <td className={style.calc__point}>{authorisationOfSku}</td> */}
      <td className={style.calc__point}>{amountOfDiscount}</td>
      <td className={style.calc__point}><input type="checkbox" onChange={inputSend}/></td>
    </tr>

  );
};

export default CalculationItem;
