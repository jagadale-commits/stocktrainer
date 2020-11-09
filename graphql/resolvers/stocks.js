const { AuthenticationError, UserInputError } = require('apollo-server');
const axios = require('axios');
const Stock = require('../../models/Stock');
const checkAuth = require('../../util/check-auth');
module.exports = {
  Query: {
    async getStocks() {
      try {
        const stocks = await Stock.find().sort({ createdAt: -1 });
        return stocks;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStock(_, { stockId }) {
      try {
        const stock = await Stock.findById(stockId);
        if (stock) {
          return stock;
        } else {
          throw new Error('Stock not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createStock(_, { ticker }, context) {
      const user = checkAuth(context);
      let price = [];
      var prediction =  Array.from({length: 100}, () => Math.floor(Math.random()*3 -1));
      var decisions = new Array(100).fill(0);
      var correct = new Array(100).fill(0);
      var timestamp1 = new Array(100);
      var timestamp2 = new Array(100);

      const newStock = new Stock({
        closingPrice: price.toString(),
        prediction: prediction.toString(),
        decisions: decisions.toString(),
        correct: correct.toString(),
        timestamp1: timestamp1.toString(),
        timestamp2: timestamp2.toString(),
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const stock = await newStock.save();

      context.pubsub.publish('NEW_STOCK', {
        newStock: stock
      });

      return stock;
    },
    async updateStock(_, { closingPrice, decisions, correct, timestamp1, timestamp2, stockId }, context) {
      const user = checkAuth(context);
      
      try {
        const stock = await Stock.findById(stockId);
        if (user.username === stock.username) {
          stock.closingPrice = closingPrice;
          stock.decisions = decisions ;
          stock.correct = correct;
          stock.timpestamp1 = timestamp1;
          stock.timestamp2 = timestamp2;
          await stock.save();
      return stock;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
        
        
    },
    async deleteStock(_, { stockId }, context) {
      const user = checkAuth(context);

      try {
        const stock = await Stock.findById(stockId);
        if (user.username === stock.username) {
          await stock.delete();
          return 'Stock deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Subscription: {
    newStock: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_STOCK')
    }
  }
};
