const md5 = require('md5');
const { InvoiceModel, UsersModel } = require('../database');
const { outSum, invDesc } = require('../config/pay.json');

const RobokassaUrl = 'https://auth.robokassa.ru/Merchant/Index.aspx';
const merchantLogin = process.env.ROBOKASSA_MERCHANT_LOGIN;
const isTest = process.env.NODE_ENV !== 'production' ? 1 : 0;

const CreatePaymentUrl = async (user) => {
  const merchantPass1 = process.env.ROBOKASSA_PASSWORD1;

  if (!merchantLogin || !merchantPass1) {
    throw new Error('Merchant data not set');
  }

  const invoice = await InvoiceModel.query().insert({ userId: user.id, amount: outSum });
  const invoiceId = invoice.toJSON().id;

  const signature = md5(`${merchantLogin}:${outSum}:${invoiceId}:${merchantPass1}`);

  return `${RobokassaUrl}?MrchLogin=${merchantLogin}&OutSum=${outSum}&InvId=${invoiceId}&Email=${user.email}&Desc=${invDesc}&IsTest=${isTest}&SignatureValue=${signature}&Encoding=UTF-8`;
};

const HandleResult = async(request) => {
  const merchantPass2 = process.env.ROBOKASSA_PASSWORD2;
  
  const sum = request.body.OutSum;
  const invoiceId = request.body.InvId;
  const signature = request.body.SignatureValue;

  const invoiceHash = md5(`${sum}:${invoiceId}:${merchantPass2}`).toUpperCase();
  if (invoiceHash !== signature) {
    throw new Error('Bad validation');
  }

  const invoiceEntity = await InvoiceModel
    .query()
    .findById(invoiceId);

  if (!invoiceEntity) {
    throw new Error('Invoice not found');
  }

  const invoice = invoiceEntity.toJSON();
  if (invoice.status === 'paid') {
    throw new Error('Invoice already paid');
  }

  await Promise.all([
    invoiceEntity.$query().patch({ status: 'paid' }),
    UsersModel.query().updateAndFetchById(invoice.userId, { paid: 1 }),
  ]);

  return invoice.id;
};

module.exports = {
  CreatePaymentUrl,
  HandleResult,
};

