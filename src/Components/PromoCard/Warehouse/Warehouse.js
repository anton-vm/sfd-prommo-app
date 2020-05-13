import React, {useState} from 'react'
import inWarehouse from "../../db/warehouse.json"

const Warehouse = ({cardPromo, toggleWarehouse}) => {


const codesInPromo = () => {
 return   cardPromo.detales.map((el) => el.barCode)
}

const codes = codesInPromo()

// const showWarehouse = () => {
//     // if (cardPromo.detales)
// //   return  inWarehouse.filter(el =>  el.barCode === )}

// //   return {for (let prod of inWarehouse)
// }

const [codeArea, setCodeArea] = useState([])



function showWarehouse () {
    const arr = [] 
for (let prod of codesInPromo()) {
   const qqq = inWarehouse.filter(el =>  el.barCode === prod) 
   arr.push(...qqq)
}
return arr
}






    return (
        <fieldset>
        <legend> Наявність на складі</legend>
        <div className="warehouse-header">
            <div className="warehouse-name-header">Продукт</div>
            <div className="warehouse-numbers">Строк придатності</div>
            <div className="warehouse-numbers">Відсоток придатності</div>
            <div className="warehouse-numbers">На складі</div>
        </div>
        <ul>
        {showWarehouse().map(el=> <li className="warehouse-items" key={el.index}>
            <p className="warehouse-name warehouse-text">{el.name}</p>
    <p className="warehouse-numbers">{el.BBDate}</p>
            <p className="warehouse-numbers">{el.BBPercent}%</p>
            <p className="warehouse-numbers">{el.quantity}</p>
            </li>) }

        {/* <button onClick={toggleWarehouse}></button> */}
        <input type="submit" onClick={toggleWarehouse} value="Закрити"/>

        </ul>
        </fieldset>
    )
}

export default Warehouse
