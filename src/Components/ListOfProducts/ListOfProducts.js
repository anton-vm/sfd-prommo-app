import React, { useState, useEffect, createRef } from "react";
// import promosData from "../db/promotions.json";
// import moment from "moment";
import Product from "./Product";
import NewArrCreate from "../CreateNewArr/NewArrCreate";

import PromoCard from "../PromoCard/PromoCard";
import style from "./Product.module.css";
import CommentsCard from "../PromoCard/CommentsCard/CommentsCard";
import NewProductForm from "../NewProductForm/NewProductForm";
import Sales from "../Sales/Sales"
// import App from "./TableOfAllProductsReact"
import axios from "axios";
import TableOfProducts from './TableOfProducts'
// import image from '../../img/Logo/sfd.png'

const ListOfProducts = () => {

  console.log(NewArrCreate)


  const [cardsArr, setCardArr] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cardPromo, setCardPromo] = useState({});
  const [sort, setSort] = useState("month");
  const [comments, setComments] = useState([]);
  const [openNewPromo, setOpenNewPromo] = useState(false);
  const [openSales, setOpenSales] =useState(false)
  const [dataBase, setDataBase] = useState(false)

  const url = `https://project-1-test-92ce7.firebaseio.com/promo.json`;

  const toggleDataBase =() => {
    setDataBase(!dataBase)
  }

  const useDataBase =() => {
    // if (dataBase) {

      setCardArr(NewArrCreate)

    // }
  }

  useEffect(() => {
    axios
      .get(url)
      .then((resp) => {
        const fetchedResults = [];
        for (let key in resp.data) {

          console.log(key);
          fetchedResults.push({
            id: key,
            ...resp.data[key],
          });
        }
        setCardArr(fetchedResults);
      })
      .catch((error) => console.log(error));
  }, []);



  const commentsItem = {
    author: "",
    comment: "",
    time: Date.now(),
  };

  const addComment = (info) => {
    setComments([...comments, info]);
  }; 

  const inputHandler = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSales= () => {
    setOpenSales(!openSales)
  }

  const addPromo = (id) => {
    const item = cardsArr.find((el) => el.id === id);
    setCardPromo(item, cardPromo);
  };

  const sortType = (e) => {
    e.preventDefault();
    const type = e.target.dataset.sort;
    setSort(type);
  };
 

  const sortData = (e) => {

    switch (sort) {
      case "month":
        return cardsArr.sort((a, b) => a.month > b.month ? 1 : -1);
      case "start":
        return cardsArr.sort((a, b) => a.promoStart > b.promoStart ? 1 : -1);
      case "end":
        console.log("Hello")
        return cardsArr.sort((a, b) => a.promoEnd > b.promoEnd ? 1 : -1);
      case "chain":
        console.log(cardsArr)
        console.log(cardsArr.sort((a, b) => a.chain > b.chain ? 1 : -1))
        return cardsArr.sort((a, b) => a.chain > b.chain ? 1 : -1);
      case "mark":
        return cardsArr.sort((a, b) => a.tradeMark > b.tradeMark ? 1 : -1);
      case "status":
        console.log(cardsArr.sort((a, b) =>  a.author - b.author))
        console.log(test.sort(function(a, b) {return a - b}));

    }
  };



  const openCardNewPromo = () => {
    setOpenNewPromo(true);
  };

  const closeCardNewPromo = () => {
    setOpenNewPromo(false);
  };
  

  return (
    <div>
      <div className="banner">
        <div className="logoBlock">
      <img src={require("../../img/Logo/sfd.png")} className="mainLogo"/>
      </div>
        {/* <img src="../../img/Logo/sfd.png"/> */}
        <h1>Маркетинг</h1>
        <p className="first-page_head">Store Food Distrubution</p>
      </div>

      <input type="checkbox" onChange={useDataBase}/> 
      
      <div className="elements-area">
        
      <button onClick={openCardNewPromo}>Додайте нову акцію</button>
      <button onClick={toggleSales}>Подивитися знижки</button>
      
      </div>

      {openNewPromo && <NewProductForm closeCardNewPromo={closeCardNewPromo} />}

      {openSales && <Sales toggleSales={toggleSales}/>} 

      {/* <App/> */}
  
      {/* <CommentsCard /> */}
      <TableOfProducts cardsArr={cardsArr} addPromo={addPromo} toggleCart={toggleCart} isCartOpen={isCartOpen}  sortType={sortType} cardPromo={cardPromo} sortData={sortData}/>


      <div className="footer banner">
        {/* <p className="first-page_head">Store Food Distrubution</p> */}
      </div>
    </div>
  );
};

export default ListOfProducts;
