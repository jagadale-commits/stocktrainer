const { AuthenticationError, UserInputError } = require('apollo-server');

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
    async createStock(_, context) {
      const user = checkAuth(context);
      var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

      var yourApiKey = '3621RSJD11QNCQ3D';
      var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);

      alphaVantageAPI.getDailyData('MSFT')
          .then(dailyData => {
            var price=dailyData;
          })
          .catch(err => {
              console.error(err);
          });
      
      var prediction =  new Array.from(Array(100)).map(x=>chance.integer({ min: -1, max: 1}));
      var decisions = new Array(100).fill(0);
      var correct = new Array(100).fill(0);
      var timestamp1 = new Array(100);
      var timestamp2 = new Array(100);
      const newStock = new Stock({
        closingPrice: price.toString,
        prediction: prediction.toString(),
        decisions: decisions.toString(),
        correct: correct.toString(),
        timpestamp1: timpestamp1.toString(),
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
    async updateStock(_, { decisions, correct, timestamp1, timestamp2, stockId}, context) {
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
        stock.decisions = decisions;
        stock.correct = correct;
        stock.timpestamp1 = timpestamp1;
        stock.timestamp2 = timestamp2;
        await stock.save();
      return stock;
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
