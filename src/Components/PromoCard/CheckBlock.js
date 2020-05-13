import React, { useState, useEffect } from 'react';
import style from "./PromoCard.module.css";


const CheckBlock = ({okArea, id, receiveOk}) => {

  console.log(okArea);

  const newOkArea = {
  okInitiator: false,
  okBrandManager: false,
  okFinance: false,
  okBrandConfirm: false,
  okSalesAccept: false,
  okSalesConfirm: false,
  okAnalitic: false,
  okHeadSales: false,
  okHeadMarketing: false,
  }

  const changeOkArea = () => {
    if (!okArea) {
      return newOkArea;
    } return okArea
  }

  const [acceptArea, setAcceptArea] = useState(changeOkArea())
  const [openModal, setOpenModal] = useState(false)

  const url = `https://project-1-test-92ce7.firebaseio.com/promo/${id}.json`;



  // useEffect(() => {
  //   changeOkArea()
  // },[])

  const inputHandler = (e) => {
  const name = e.target.name;
  if (e.target.checked) {
  setAcceptArea({...acceptArea, [name]: true})
  } else {setAcceptArea({...acceptArea, [name]: false})}
  }

  const clickTogether =(e) =>{
    inputHandler(e);
    setOpenModal(true)
  }

  const clickModal =() => {
    console.log(acceptArea);
    receiveOk(acceptArea)
    setOpenModal(false)
  }

  const closeModalButtons = () => {
    setOpenModal(false)
  }

    return (
        <div className={style.chekList}>
        <form className="elements-area">
        <div className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okBrandManager" onChange={clickTogether} checked={acceptArea.okBrandManager===true && "checked"}></input>
        <label >1 - Погоджено Бренд Менеджером</label>
        </div>
        <div className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okBrandConfirm" onChange={clickTogether} checked={acceptArea.okBrandConfirm===true && "checked"} disabled={!acceptArea.okBrandManager && "disabled"}></input>
        <label >2 -    Бренд Менеджер Погодив до запуску</label>
        </div>
        <div  className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okSalesAccept" onChange={clickTogether} checked={acceptArea.okSalesAccept===true && "checked"} disabled={!acceptArea.okBrandConfirm && "disabled"}></input>
        <label  >3 - Менеджер ДУКО Прийняв у роботу</label>
        </div>
        <div  className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okSalesConfirm" onChange={clickTogether} checked={acceptArea.okSalesConfirm===true && "checked"} disabled={!acceptArea.okSalesAccept && "disabled"}></input>
        <label>4 - Погоджено з мережею</label>
        </div>
        <div  className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okAnalitic" onChange={clickTogether} checked={acceptArea.okAnalitic===true && "checked"} disabled={!acceptArea.okSalesConfirm && "disabled"}></input>
        <label>5 - Підтверджено аналітиком</label>
        </div>
        <div  className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okHeadSales" onChange={clickTogether} checked={acceptArea.okHeadSales===true && "checked"} disabled={!acceptArea.okAnalitic && "disabled"}></input>
        <label >6 - Погоджено керівником відділу ДУКО</label>
        </div>
        <div  className="column-check">
        <input type="checkbox" className={style.checkList__checkbox} name="okHeadMarketing" onChange={clickTogether} checked={acceptArea.okHeadMarketing===true && "checked"} disabled={!acceptArea.okAnalitic && "disabled"}></input>
        <label >7 - Погоджено керівником відділу маркетингу</label>
        </div>
        </form>

        {openModal && 
              <div className="overlay-modal"> 
              <div className="card">
                <button onClick={clickModal}>Підтвердити</button>
                <button onClick={closeModalButtons}>Відмовити</button>
                   
            </div>
            </div>
                
                }

      </div>
    );
};

export default CheckBlock;