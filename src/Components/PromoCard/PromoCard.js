import React, { useState, useEffect } from "react";
import style from "./PromoCard.module.css";
import moment from "moment";
import PromoList from "../PromoCard/PromoList";
import CommentsCard from "./CommentsCard/CommentsCard";
import CheckBlock from "./CheckBlock";
import Calculation from "./Calculation/Calculation";
import Warehouse from "./Warehouse/Warehouse";
import AboutClient from "./AboutClient/AboutClient";
import "./PromoCard.module.css";
import axios from "axios";

const PromoCard = ({ cardPromo, isCartOpen, toggleCart }) => {
  const [calcOpen, setCalcOpen] = useState(false);
  const [commentOpen, setCommnetOpen] = useState(false);
  const [commentAuthor, setComentAuthor] = useState("");
  const [commentText, setComentText] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);
  const [newAreaWithOk, setNewAreaWithOk] = useState({});
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [aboutClientOpen, setAboutClientOpen] = useState(false);

  function toggleCalc() {
    setCalcOpen(!calcOpen);
  }

  function toggleComment() {
    setCommnetOpen(!commentOpen);
  }

  function toggleWarehouse() {
    setWarehouseOpen(!warehouseOpen);
  }

  function toggleClient() {
    setAboutClientOpen(!aboutClientOpen);
  }

  const promo = cardPromo;
  const card = [style.card];
  const detales = cardPromo.detales;
  const calcBtn = [style.calculation];

  if (calcOpen) {
    calcBtn.push(style.calculation__on);
  }

  function listSku() {
    if (isCartOpen) {
      return detales.map((el) => <PromoList el={el} key={el.index} />);
    }
  }

  function inputAuthor(e) {
    setComentAuthor(e.target.value);
  }

  function inputCommentText(e) {
    setComentText(e.target.value);
  }

  const commentSubmit = (e) => {
    e.preventDefault();
    const data = {
      time: Date.now(),
      author: commentAuthor,
      text: commentText,
    };
    setCommentsArr([...commentsArr, data]);
    toggleComment();
  };

  useEffect(() => {
    if (commentsArr.length > 0) {
      setNewAreaWithOk({ ...newAreaWithOk, comment: commentsArr });
      return;
    }
    if (!cardPromo.comment & (commentsArr.length === 0)) {
      return;
    }
    if (cardPromo.comment) {
      setCommentsArr(cardPromo.comment);
    }
  }, [commentsArr]);

  const url = `https://project-1-test-92ce7.firebaseio.com/promo/${cardPromo.id}.json`;
  const receiveOk = (ok) => {
    setNewAreaWithOk({ ...newAreaWithOk, signature: ok });
  };

  const sendToServerNewArea = () => {
    axios
      .put(url, newAreaWithOk)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  // const sendCommentsToServer = async() => {
  //     axios.put(url, newAreaWithOk)
  //     .then(res=> console.log(res.data))
  //     .catch(error => console.log(error))
  // }

  useEffect(() => {
    const a = JSON.stringify(newAreaWithOk);
    const b = JSON.stringify(cardPromo);
    if (Object.keys(newAreaWithOk).length === 0) {
      setNewAreaWithOk(cardPromo);
    } else {
      if (a === b) {
        return;
      } else {
        sendToServerNewArea();
      }
    }
  }, [newAreaWithOk]);


  const status =() => {
    if (promo.signature.okHeadMarketing) {return "Акція погоджена"};
    if (promo.signature.okHeadSales) {return "Акція погоджена"};
    if (promo.signature.okAnalitic) {return "Продукція є для акції"};
    if (promo.signature.okSalesConfirm) {return "Мережа погодила"};
    if (promo.signature.okSalesAccept) {return "Узгоджується із мережею"};
    if (promo.signature.okBrandConfirm) {return "Погоджено для запуску в мережі"};
    if (promo.signature.okFinance) {return "Пораховано"};
    if (promo.signature.okBrandManager) {return "Відправлена на прорахунок"};
    if (!promo.signature.okBrandManager) {return "Акція створена"};
  }

  return (
    <div className="overlay-modal">
      <div className="card">
        <div className="banner">
          <h1>Деталі по акції</h1>
        </div>

        <fieldset>
          <div className="close_icon" onClick={toggleCart}></div>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.period}>
                <span>
                  <span className={style.bigInfo}>
                    {Math.ceil((promo.promoStart - Date.now()) / 86400000)}{" "}
                  </span>
                  <div>днів до початку</div>
                </span>

                <span className={style.bigInfoChain}>{promo.chain}</span>

  <div className={style.status}>{status()}</div>
                {/* <span className={style.tradeMark}>{promo.tradeMark}</span> */}

              </div>
            </div>

            <div className={style.right}>
              <div className={style.tocenter}>
                <div>
                  <span>Дата створення акції:</span>
                  {moment(Date.now()).format("DD/MM/YYYY")}
                </div>
              </div>
              <span className={style.info}>Період акції:</span>

              <span className={style.dates}>
                {moment(promo.promoStart).format("ll")} ---{" "}
                {moment(promo.promoEnd).format("ll")}
              </span>
              <div className={style.info}>
                Дата загрузки:{" "}
                <span className={style.infoData}>
                  {moment(promo.loadDate).format("ll")}
                </span>
              </div>
              <div className={style.info}>
                Тип активності:{" "}
                <span className={style.infoData}>{promo.typeOfActivity}</span>
              </div>
              <div className={style.info}>
                Вартість авторизації:{" "}
                <span className={style.infoData}>
                  {promo.authorisation} грн
                </span>
              </div>
              <div className={style.info}>
                Знижка:{" "}
                <span className={style.infoData}>{promo.discountPercent}</span>{" "}
                %
              </div>
              <div className={style.info}>Продукція </div>
              <div className={style.listSKU}>
              {listSku()}
              </div>

              <div className={style.info}>
                Затрати на проведення акції:{" "}
                <span className={style.infoData}>
                  !!після розрахунків!! грн
                </span>
              </div>

              {/* className={style.btnCalculation} */}
            </div>
          </div>

          <div className="elements-area elements-area-flex-wrap">
            <button onClick={toggleCalc}>Подивитись розрахунки</button>
            <button onClick={toggleComment}>Занести коментар</button>
            <button onClick={toggleWarehouse}>Що робиться на складі</button>
            <button onClick={toggleClient}>Характеристика клієнта</button>
            <button>Внести зміни у акцію</button>
          </div>

          {commentOpen && (
            <CommentsCard
              inputAuthor={inputAuthor}
              inputCommentText={inputCommentText}
              commentSubmit={commentSubmit}
              toggleComment={toggleComment}
            />
          )}

          {calcOpen && (
            <Calculation
              cardPromo={cardPromo}
              discount={promo.discountPercent}
              toggleCalc={toggleCalc}
            />
          )}

          <div>
            <fieldset>
              <legend> Коментарі до акції</legend>
              <ul className="comments-area">
                {commentsArr.map((el) => (
                  <li>
                    {moment(el.time).format("ll")} {el.author} {el.text}
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>

          {warehouseOpen && (
            <Warehouse
              cardPromo={cardPromo}
              toggleWarehouse={toggleWarehouse}
            />
          )}
          {aboutClientOpen && <AboutClient toggleClient={toggleClient} />}

          <CheckBlock
            okArea={cardPromo.signature}
            id={cardPromo.id}
            receiveOk={receiveOk}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default PromoCard;
