import React, { useState, useEffect } from "react";
import productPrice from '../db/priceAndProduct.json'

const NewProductfFillForm = ({ addDetales, filledOneProduct }) => {
  const detales = {
    sku: "",
    barCode: "",
    freshness: "",
    statisticSells: 0,
    quantityForCompensation: 0,
    priceOrdinar: 0,
    pricePromo: 0,
  };

  const [filledForm, setFilledForm] = useState(detales);
  

  const inputHandlerText = (e) => {
    const { name, value } = e.target;
    // if (e.target.value === filledForm.sku) {alert("Цей продукт вже є у списку, виберіть інший")}
    setFilledForm({ ...filledForm, [name]: value });
  };

  const inputHandlerNumber = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    if (!value) {
      alert("Введіть дробове число через крапку");
      e.target.value = null
      return;
    }
    setFilledForm({ ...filledForm, [name]: value });
  };

  const inputSend = (e) => {
      e.preventDefault()
    
      addDetales(filledForm);
      filledOneProduct();
      setFilledForm(detales)
      // resetForm()
    // }
  };

  useEffect(() => {
    productPrice.map(el => (el.shortName===filledForm.sku && setFilledForm({ ...filledForm, priceOrdinar: el.supermarketPrice, barCode: el.barCode }) ))
    // productPrice.map(el => (el.shortName===filledForm.sku && setFilledForm({ ...filledForm, barCode: el.barCode }) ))
  }, [filledForm.sku])
  
  const resetForm = () => {

    // console.log(document.querySelector("#form-item"))
    document.getElementById("1").reset()

  }

 


  return (
    
    
    <tr >
      <td>
        <p>
          {/* <input type="text" name="sku" onChange={inputHandlerText} /> */}
          <select type="text" name="sku" onChange={inputHandlerText}>
          <option value=""></option>
          {productPrice.map(el => (<option key={el.shortName} value={el.shortName}>{el.shortName}</option>))}
        </select>
        </p>
      </td>
      {/* <td>
        <p>
          <input type="text" name="freshness" onChange={inputHandlerText}/>
        </p>
      </td> */}
      <td>
        <input
          type="text"
          name="statisticSells"
          onChange={inputHandlerNumber}
          
        />
      </td>
      <td>
        <input
          type="text"
          name="quantityForCompensation"
          onChange={inputHandlerNumber}
          
        />
      </td>
      <td>
        {/* <input type="text" name="priceOrdinar" onChange={inputHandlerNumber} /> */}
        <p id="price">
          {productPrice.map(el => (el.shortName===filledForm.sku && el.supermarketPrice))}
        </p>
      </td>
      <td>
        <input type="submit" onClick={inputSend} value="Підтверджую"/>
      </td>
      
    </tr>
    
  );
};

export default NewProductfFillForm;
