import React, { useState, useEffect } from "react";
import moment from 'moment';
import NewProductItemForm from './NewProductItemForm'
import productArr from '../../db/priceAndProductName.json'
import clients from "../db/clients.json"
import axios from 'axios'
import './styles.css'

// const key = 'AIzaSyAS-NzuC-rEq6N9wVpN1ngHd7S0t3CIYdM';
const url = `https://project-1-test-92ce7.firebaseio.com/promo.json`

const NewProductForm = ({closeCardNewPromo}) => {
  const promoObj = {
    dateOfCreating: Date.now(),
    author: "",
    // month: 0,
    promoStart: 0,
    promoEnd: 0,
    loadDate: 0,
    periodOfPromo: 0,
    
    chain: "",
    tradeMark: "",
    authorisation: 0,
    discountPercent: 0,
    typeOfActivity: "", //планова, не планова, розпродаж, просування
    descriptionOfActivity: "", 
    mainComment: "",
    termsOfCompensation: "", // в накладной, по итогам продаж
    marketingBudjet: "", // накапливаемый бюджет, от производителя, средства СФД
    detales: [
    //   {
    //     // sku: "",
    //     // freshness: "",
    //     // statisticSells: 0,
    //     // quantityForCompensation: 0,
    //     // priceOrdinar: 0,
    //     // pricePromo: 0,
    //   },
    ],
    comment: [
    //   {
    //     time: 0, //Date.now
    //     author: "",
    //     text: "",
    //   },
    ],
    signature: {
      okInitiator: false,
      okBrandManager: false,
      okFinance: false,
      okBrandConfirm: false,
      okSalesAccept: false,
      okSalesConfirm: false,
      okAnalitic: false,
      okHeadSales: false,
      okHeadMarketing: false,
    },
    calculation: [
    //   {
    //     time: 0, //Date.now()
    //     authorisationOfSku: 0,
    //     discount: 0,
    //     calculateItems: [
    //       {
    //         sku: "",
    //         priceOrdinar: 0,
    //         cost: 0,
    //         chainVariables: 0,
    //         quantityForCompensation: 0,
    //         priceWithDiscount: 0,
    //         profitability: 0,
    //         ammountOfSells: 0,
    //         costOfSells: 0,
    //         costOfVariables: 0,
    //         margin: 0,
    //         amountOfDiscount: 0,
    //       },
    //     ],
    //     totalMargin: 0,
    //     totalDiscount: 0,
    //     totalCost: 0,
    //     resultsOfPromo: 0,
    //   },
    ],
    changesInPromo: [
    //     {
    //     time: 0, //Date.now()
    //     author: "",
    //     typeOfChange: "",  //перенос, отмена, 
    //     comment: ""
    // }
]
  };

  const [filledForm, setFilledForm] =useState(promoObj)
  const [openProduct, setOpenProduct] = useState(false)
  const [detalesArr, setDetalesArr] = useState([])
  const [results, setResults] = useState([])
  const [formReadyToSend, setFormReadyToSend] = useState({})  



  const inputHandlerDate =(e) => {
      const {name, value} = e.target;
      setFilledForm({...filledForm, [name]: Number(moment(value).format('x'))})
  }
  const inputHandlerText =(e) => {
    const {name, value} = e.target;
    setFilledForm({...filledForm, [name]: value})
}

const inputHandlerNumber =(e) => {
  const name = e.target.name;
  const value = Number(e.target.value);
    if (!value) {
      alert("Введіть дробове число через крапку");
      e.target.value = null
      return;
    }
    setFilledForm({...filledForm, [name]: Number(value)})
}

const addDetales = ( descriptions) => {
  
    setDetalesArr([...detalesArr, descriptions])
}

// const openTable =(e) => {
//     e.preventDefault()
//     setOpenProduct(true)
// }
  

const addDetalesToBigState = (e) => {
    e.preventDefault()
    console.log(detalesArr);
   setFilledForm({...filledForm, detales: detalesArr})
}


const productIsReadyConfirm =  (e) => {

  addDetalesToBigState(e)


}

useEffect(() => {
  console.log(filledForm.detales.length);
  if (filledForm.detales.length === 0) {return}
  else {
    setFormReadyToSend(filledForm)
  } 
}, [filledForm.detales])

useEffect(() => {
  console.log(Object.keys(formReadyToSend).length);
  if (!Object.keys(formReadyToSend).length ) {return}
  else {

    console.log(formReadyToSend);
      axios.post(url, formReadyToSend)
  .then(resp => console.log(resp.data))
  .catch(error => console.log(error));
  }


  closeCardNewPromo()
}, [formReadyToSend])


// useEffect(() => {
//   axios.post(url, formReadyToSend)
//   .then(resp => console.log(resp.data))
//   .catch(error => console.log(error));
// }, [filledForm])



// useEffect(() => {
// axios.get(url)
//     .then(resp => { 
//       const fetchedResults =[];
//       for ( let key in resp.data ) {
//         console.log(key);
//         fetchedResults.push( 
//           {
//           id:key,
//           ...resp.data[key],
//         }
//         )
//       }
//       setResults(fetchedResults)
//     })
//     .catch(error => console.log(error));
// }, [])




// console.log(results);

  return (
    <div>
      <div className="overlay-modal">

      <form className="form-product">
        
        <div className="banner">
          <h1>Внесіть дані по новій акції</h1>
        </div>
        <fieldset>
        <legend>Заповніть дані акції</legend>
        <div className="date-now"> <span name="dateOfCreating" value={Date.now()}>{moment(Date.now()).format("DD/MM/YYYY")}</span></div>
  
      <div className="left">Торгова марка:<select type="text" name="tradeMark" onChange={inputHandlerText}>
          <option value=""></option>
          <option value="Sante">Sante</option>
          <option value="Sonko">Sonko</option>
          <option value="Develey">Develey</option>
          <option value="Lavka">Лавка здоров'я</option>
          <option value="Rafael Salgado">Rafael Salgado</option>
          </select>
          </div>
      <div>Торгова мережа:
        <select type="text" name="chain" onChange={inputHandlerText}>
        <option value=""></option>
          {clients.map(el => (<option key={el.shortName} value={el.shortName}>{el.shortName}</option>))}
        </select>
        
        </div>


    <div className="elements-area">
      <div className="item">
      Початок акції: <span>*</span>
      <input type="date" name="promoStart" onChange={inputHandlerDate}/>
      {/* <i className="fas fa-calendar-alt"></i> */}
      </div >

      <div className="item">Закінчення акції: <input type="date" name="promoEnd" onChange={inputHandlerDate} /></div>
      <div className="item">Дата відгрузки: <input type="date" name="loadDate" onChange={inputHandlerDate}/></div>

    </div>

      <fieldset>
      <div className="radioArea">
      <div className="question left question-block">
        <label>Вид активності: </label>              
          <div>
           <input type="radio" name="typeOfActivity" id="typeOfActivity1" value="Планова" onChange={inputHandlerText}/>
          <label for="typeOfActivity1" className="radio"><span>Планова</span></label>
          </div>

          <div>
          <input type="radio" name="typeOfActivity" id="typeOfActivity2" value="Додаткова" onChange={inputHandlerText}/>
          <label for="typeOfActivity2" className="radio"><span>Додаткова</span></label>
          </div>

          <div>
          <input type="radio" name="typeOfActivity" id="typeOfActivity3" value="Розпродаж" onChange={inputHandlerText}/>
          <label for="typeOfActivity3" className="radio"><span>Розпродаж</span></label>
          </div>

          <div>
          <input type="radio" name="typeOfActivity" id="typeOfActivity4" value="Просування" onChange={inputHandlerText}/>
          <label for="typeOfActivity4" className="radio"><span>Просування</span></label>
          </div>

         </div>
         

         <div  className="question left question-block">
           <label>Вид компенсації знижки:</label>
           <div>
          <input type="radio" name="termsOfCompensation" id ="termsOfCompensation1" value="В накладній" onChange={inputHandlerText}/>
          <label for="termsOfCompensation1" className="radio"><span>В накладній</span></label>
          </div>  

          <div>
          <input type="radio" name="termsOfCompensation" id ="termsOfCompensation2" value="По результатам продажів" onChange={inputHandlerText}/>
          <label for="termsOfCompensation2" className="radio"><span>По результатам продажів</span></label>
          </div>      
        </div>
        </div>
        </fieldset>

        
      <div>Опис акції: <input type="text" name="descriptionOfActivity" onChange={inputHandlerText}/></div>
      <div>Коментарі: <input type="text" name="mainComment" onChange={inputHandlerText}/></div>

      <fieldset>
          <legend>Маркетинг</legend>
      <div  className="question left">
      <label>Покриття затрат за рахунок:</label> 
      <div className="line-questions">

      <div>
      <input type="radio" name="marketingBudjet" id="marketingBudjet1" value="none" onChange={inputHandlerText} disabled/>
      <label for="marketingBudjet1" className="radio"><span>Накопичений бюджет</span></label>
      </div>

      <div>
      <input type="radio" name="marketingBudjet" id="marketingBudjet2" value="none" onChange={inputHandlerText} disabled/>
      <label for="marketingBudjet2" className="radio"><span>Постачальник</span></label>
      </div>

      <div>
      <input type="radio" name="marketingBudjet" id="marketingBudjet3" value="none" onChange={inputHandlerText} disabled/>
      <label for="marketingBudjet3" className="radio"><span>Кошти СФД</span></label>
      </div>
          </div>
          </div>
      <div className="elements-area">
      <div><p>Вартість авторизації:</p> <input type="text" name="authorisation" onChange={inputHandlerNumber}/></div>
      <div>Відсоток знижки: <input type="text" name="discountPercent" onChange={inputHandlerNumber}/></div>
      </div>
      </fieldset>

      {/* <button onClick={openTable}>Занести продукцію</button> */}
       <NewProductItemForm addDetales={addDetales} arrOfProducts={detalesArr}/>

       <div className="item left">
        <label>Ініціатор акції:</label>
        <input type="text" name="author" onChange={inputHandlerText}/>
      </div>

      <div className="elements-area">
      <input type="submit" value="Отмєна" onClick={closeCardNewPromo}/>
      <input type="submit" value="Відправити" onClick={productIsReadyConfirm}/>
      </div>



      </fieldset>

      </form>
      </div>

    </div>
  );
};

export default NewProductForm;
