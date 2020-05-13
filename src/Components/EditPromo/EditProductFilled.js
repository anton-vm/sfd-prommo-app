import React from 'react';

const NewProductFilled = ({el}) => {

    const {
        sku,
        freshness,
        statisticSells,
        quantityForCompensation,
        priceOrdinar,
        pricePromo,
      } = el
    
    return (
        <tr>
          <td >{sku}</td>
          <td >{statisticSells}</td>
          <td >{quantityForCompensation}</td>
          <td >{priceOrdinar}</td>
          <td ><input type="checkbox" checked disabled/></td>  
        </tr>
    );
};

export default NewProductFilled;