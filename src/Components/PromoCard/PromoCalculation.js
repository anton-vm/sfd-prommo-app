import React from "react";

const PromoCalculation = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>

        <tbody>
          {cardsArr.map((el) => (
            <CalculationItem
              el={el}
              key={el.id}
              addPromo={addPromo}
              toggleCart={toggleCart}
              isCartOpen={isCartOpen}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromoCalculation;
