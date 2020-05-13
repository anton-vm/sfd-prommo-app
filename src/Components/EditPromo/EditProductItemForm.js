import React, { useState } from 'react';
import NewProductfFillForm from './NewProductfFillForm'
import NewProductFilled from './NewProductFilled'


const NewProductItemForm = ({addDetales, arrOfProducts}) => {

    const detales = {        
            sku: "",
            barCode: 0,
            freshness: "",
            statisticSells: 0,
            quantityForCompensation: 0,
            priceOrdinar: 0,
            pricePromo: 0,   
    }

    const [newLine, setNewLine] = useState(false)
    const [filledItem, setFilledItem] = useState(false)


    const filledOneProduct =() => {
        setFilledItem(true)
    }

    return (

    <table >
      <thead>
        <tr>
          <td >Продукт</td>
          <td >Статистичні продажі</td>
          <td >Кількість на акцію</td>
          <td >Ціна звичайна</td>
          <td >Підтвердження</td>  
        </tr>
      </thead>
      <tbody>
          {filledItem && arrOfProducts.map(el => <NewProductFilled el={el} key={el.sku}/>)}
          <NewProductfFillForm addDetales={addDetales} filledOneProduct={filledOneProduct}/>


      </tbody>

      </table>
            

    );
};

export default NewProductItemForm;