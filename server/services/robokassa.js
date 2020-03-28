const md5 = require('md5');
const { BadRequestError, NotFoundError } = require('http-custom-errors');
const { InvoiceModel, UsersModel, PromocodesModel, knex } = require('../database');
const { outSum, invDesc } = require('../config/pay.json');

const RobokassaUrl = 'https://auth.robokassa.ru/Merchant/Index.aspx';
const merchantLogin = process.env.ROBOKASSA_MERCHANT_LOGIN;
const isTest = process.env.NODE_ENV !== 'production' ? 1 : 0;

const CreatePaymentUrl = async (user, code) => {
  const merchantPass1 = process.env.ROBOKASSA_PASSWORD1;

  if (!merchantLogin || !merchantPass1) {
    throw new Error('Merchant data not set');
  }

  let invoice = await InvoiceModel.query().findOne({ userId: user.id });
  if (invoice) {
    const invoiceObj = invoice.toJSON();
    if (invoiceObj.status === 'paid') {
      throw new BadRequestError('Invoice already paid');
    }
    
    return invoiceObj.payLink;
  } else {
    let amount = outSum, promocodeId;
    if (code) {
      const promocodeEntity = await PromocodesModel.query().findOne({ code });
      if (!promocodeEntity) {
        throw new NotFoundError('Promocode not found');
      }

      const promocode = promocodeEntity.toJSON();
      promocodeId = promocode.id;
      amount *= (1 - promocode.discount || 0);
    }

    invoice = await InvoiceModel.query().insert({ userId: user.id, amount, promocodeId });
    const invoiceId = invoice.toJSON().id;

    const signature = md5(`${merchantLogin}:${amount}:${invoiceId}:${merchantPass1}`);
    const email = user.email ? `&Email=${encodeURIComponent(user.email)}` : '';
    const payLink = `${RobokassaUrl}?MrchLogin=${merchantLogin}&OutSum=${amount}&InvId=${invoiceId}${email}&Desc=${invDesc}&IsTest=${isTest}&SignatureValue=${signature}&Encoding=UTF-8`;

    await invoice.$query().patch({ payLink });

    return payLink;
  }
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
    invoiceEntity.$query().patch({ status: 'paid', updatedAt: knex.raw('now()') }),
    UsersModel.query().updateAndFetchById(invoice.userId, { paid: true }),
  ]);

  return invoice.id;
};

module.exports = {
  CreatePaymentUrl,
  HandleResult,
};

