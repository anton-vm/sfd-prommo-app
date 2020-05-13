import React, { useState, useEffect } from "react";
import CalculationItem from "./CalculationItem";
import style from "./Calculation.module.css";



const Calculation = ({ cardPromo, discount, toggleCalc }) => {
  // const authorisationOfSku = cardPromo.authorisation / cardPromo.detales.length;

  const calculationStructure = {
    chainVariables: 0,
    authorisationOfSku: cardPromo.authorisation,
    time: Date.now(),
    discount: discount,
    amounOfDiscount: 0,
    amountOfMargin: 0,
    promoItems: [],
    totalCost: 0,
    resultOfPromo: 0
  }

  const [promoProducts, setPromoProducts] = useState([])
  const [isTakePromoData, setIsTakePromoData] = useState(false)
  const [calculation, setCalculation] = useState(calculationStructure)


  const takePromoData = (promoState) => {
    setPromoProducts([...promoProducts,promoState])
  }



const startCalculate = () => {
  setIsTakePromoData(true)
}

useEffect(() => {
  if (promoProducts.length>0) {

  totalDiscount()
 }

}, [promoProducts])

const totalDiscount =() => {
 const discount = promoProducts.map(el => el.amountOfDiscount)
 const dicsountTotal = discount.reduce((acc, el) => acc + el)
 const margin = promoProducts.map(el => Number(el.margin))
 const dicsountMargin = margin.reduce((accum, el) => accum + Number(el))
 setCalculation({...calculation, amounOfDiscount: dicsountTotal, amountOfMargin: dicsountMargin})
}

useEffect(() => {
  console.log(calculation.authorisationOfSku)
  const totalCost = calculation.amounOfDiscount + calculation.authorisationOfSku;
  const resultOfPromo = calculation.amountOfMargin - totalCost
  setCalculation({...calculation, totalCost: totalCost, resultOfPromo: resultOfPromo})
}, [calculation.amounOfDiscount, calculation.authorisationOfSku])






const inputHandlerNumber = (e) => {
  const name = e.target.name;
  const value = Number(e.target.value);
  if (!value) {
    alert("Введіть дробове число через крапку");
    e.target.value = null
    return;
  }
  setCalculation({ ...calculation, [name]: value });
};



  return (
 <div className="overlay-modal"> 
 <div className="card-table">
 <div className="close_icon" onClick={toggleCalc}></div>
    <fieldset>
      <legend>Розрахунок вартості акції</legend>
    <div className="inner-element">
    {/* <div className="overlay-modal">
      <div className="card"> */}
      {/* <div className="close_icon" onClick={toggleCalc}></div> */}
      <div className="elements-area">
      <div className="item">Перемінні: <input type="text" name="chainVariables"  onChange={inputHandlerNumber}/></div>
      <div className="item">Авторизація: <input type="text" name="authorisationOfSku" placeholder={calculation.authorisationOfSku} onChange={inputHandlerNumber}/></div>
      </div>

    <table className={style.greenTable}>
      <thead className={style.head}>
      {/* <button onClick={startCalculate}>TakeData</button> */}
        <tr className="table-header">
          <td className={style.calc__point}>Назва</td>
          <td className={style.calc__point}>Ціна звична</td>
          {/* <td className={style.calc__point}>скидка</td> */}
          <td className={style.calc__point}>Ціна зі знижкою</td>
          <td className={style.calc__point}>Собівартість</td>
          <td className={style.calc__point}>Рентабе льніст</td>
          <td className={style.calc__point}>Кількість на акцію</td>
          <td className={style.calc__point}>Сума продажу</td>
          <td className={style.calc__point}>C/c продажу</td>
          {/* <td className={style.calc__point}>% змінних</td> */}
          <td className={style.calc__point}>Сума змінних</td>
          <td className={style.calc__point}>Маржа</td>
          {/* <td className={style.calc__point}>Авторизация</td> */}
          <td className={style.calc__point}>Скидка</td>
          <td className={style.calc__point}>ОК</td>
        </tr>
      </thead>
      <tbody>
        {cardPromo.detales.map((el) => (
          <CalculationItem
            key={el.sku}
            el={el}
            discount={discount}
            takePromoData={takePromoData}
            isTakePromoData={isTakePromoData}
            variables={calculation.chainVariables}
          />
        ))}
      </tbody>
    </table>

    <div className="elements-area">

    <div>
      <input type="text" className="input-text" placeholder="Внесіть коментар до розрахунків"></input>
    </div>


    <div>
        <p>Загальна знижка: {calculation.amounOfDiscount} грн</p>
        <p>Загальна маржа {calculation.amountOfMargin} грн</p>
        <p>Загальна вартість акції {calculation.totalCost } грн</p>
        <p>Результативність акції: {calculation.resultOfPromo} грн</p>
    </div>

    <div>
      <input type="checkbox"/>
      <input type="submit" value="Підтвердити"/>
      <input type="submit" value="Закрити" onClick={toggleCalc}/>

    </div>

    </div>

    </div>
    </fieldset>
    </div>
    </div>
  );
};

export default Calculation;
