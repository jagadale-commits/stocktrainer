import gql from 'graphql-tag';

export const FETCH_STOCK_QUERY = gql`
  query($stockId: ID!) {
    getStock(stockId: $stockId) {
        id
        username
        createdAt
        closingPrice
        prediction
        decisions
    }
  }
`;

export const FETCH_STOCKS_QUERY = gql`
  {
    getStocks {
        id
        username
        createdAt
        closingPrice
        prediction
        decisions
    }
  }
`;

export const CREATE_STOCK = gql`
  mutation createStock($ticker: String!) {
    createStock(ticker: $ticker) {
    id
  }
  }
`;

export const UPDATE_STOCK = gql`
  mutation updateStock($stockId: String!, $decisions: [Number]!) {
    updateStock(stockId: $stockId, decisions: $decisions) {
    id
  }
  }
`;


   