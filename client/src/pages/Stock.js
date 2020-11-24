import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import StockCard from '../components/StockCard'
import { FETCH_STOCK_QUERY } from '../util/graphql';

function Stock(props) {
  const stockId = props.match.params.stockId;
  const {
    data: { getStock }
  } = useQuery(FETCH_STOCK_QUERY, {
    variables: {
      stockId
    }
  });
  let postMarkup;
  if (!getStock) {
    postMarkup = <p>Loading post..</p>;
  } else {
    var {
        id,
        closingPrice,
        prediction,
        decisions,
    } = getStock;
    var price50 = closingPrice.slice(0, 50);
    var predict = closingPrice[50]>=closingPrice[49] ? "BUY" : "SHORT";
    var ind = 50;
  var state = {
    id: id,
    closingPrice: closingPrice,
    prediction: prediction,
    decisions: decisions,
    predict: predict,
    ind:ind,
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49','50'],
    datasets: [
      {
        label: "Stock Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: price50 
      }
    ]
  }
  postMarkup = (
  <div>
    <StockCard state={state}/>
  </div>
  );
  }
  return postMarkup;
}

export default Stock;