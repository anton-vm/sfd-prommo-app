
import promosData from "../db/promotions.json";
import moment from "moment";
import axios from 'axios';


const url = `https://project-1-test-92ce7.firebaseio.com/promo.json`
    const datePromoStart = [];

    promosData.map((promos) => datePromoStart.push(promos.promoStart));
  
  
    function uniq(a) {
      let result = [];
      for (let el of datePromoStart) {
        if (!result.includes(el)) {
          result.push(el);
        }
      }
      return result.sort();
    }
  
    const XZ = uniq(datePromoStart);
  
    function createNewArr(base) {
      let result = [];
  
      for (let xxx of base) {
        let filteredArr = promosData.filter((obj) => obj.promoStart === xxx);
  
        if (filteredArr.indexOf(filteredArr) === -1) {
          const promos = filteredArr[0];
  
          const promoDetales = [];
          const promoObj = {
            dateOfCreating: Date.now(),

            promoStart: Number( moment(promos.promoStart).format("x")),
            promoEnd: Number(moment(promos.promoEnd).format("x")),
            loadDate: Number(moment(promos.loadDate).format("x")),
            periodOfPromo: Number(promos.periodOfPromo),
            category: promos.category,
            plan: promos.plan,
            chain: promos.chain,
            tradeMark: promos.tradeMark,
            authorisation: Number(promos.authorisation),
            discountPercent: Number(promos.discountPercent),
            typeOfActivity: promos.typeOfActivity,
            descriptionOfActivity: promos.comments,
            detales: promoDetales,
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
          };
  
          for (let promos of filteredArr) {
            const toPush = {
              sku: promos.sku,
              freshness: promos.freshness,
              termsOfCompensation: promos.termsOfCompensation,
              statisticSells: Number(promos.statisticSells),
              quantityForCompensation: Number(promos.quantityForCompensation),
              priceOrdinar: Number(promos.priceOrdinar),
              pricePromo: Number(promos.pricePromo),
              costCompensation: promos.costCompensation,
            };
            promoDetales.push(toPush);
            
          }

          result.push(promoObj);
          // axios.post(url, promoObj)
          // .then(res => console.log(res.data))
          // .catch(error => console.log(error))
        }
      }
  
      
      return (result);
      
    }
  
  const NewArrCreate = createNewArr(XZ);    



export default NewArrCreate;