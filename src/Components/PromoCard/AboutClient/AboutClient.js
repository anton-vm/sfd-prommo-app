import React from "react";

export const AboutClient = ({toggleClient}) => {
  return (
    <div>
      {/* <div className="overlay-modal"> */}
        <div className="card">
<fieldset>
    <legend>Коротка характеристика клієнта</legend>
    <div className="elements-area-left">
    <p>Товарообіг за рік:  грн</p>
    <p>Доля продажів у компанії: %</p>
    <p>Всього заплановано акцій на 2020р:   шт</p>
    <p>Розмір обов'язкового бюджету в мережі:   грн</p>
    <p>Проведено акцій:  шт</p>
    <p>Використано бюджету:   шт</p>
    <p>Залишилось провести акцій:  шт</p>
    <p>Залишок бюджету для мережі:  грн</p>
    {/* <p>... посилянна на інші акції мережі</p> */}
    </div>
    <input type="submit" value="Закрити" onClick={toggleClient}/>
</fieldset>



        </div>
      </div>
    // </div>
  );
};

export default AboutClient
