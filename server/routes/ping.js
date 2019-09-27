const { ExampleModel } = require('../database');

const PingController = async (ctx) => {
  const { message } = await ExampleModel.query().findById(1);
  
  ctx.body = message;
};

const PingRoute = '/ping';

module.exports = {
  PingController,
  PingRoute,
};
