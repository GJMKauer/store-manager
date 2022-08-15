const sinon = require('sinon');
const { expect } = require('chai');

const SalesProductsModel = require('../../../models/SalesProductsModel');
const connection = require('../../../models/connection');

const salesList = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 50
  },
];

const mockNewSaleProduct = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}, undefined];

describe('Testes da Camada de Models - SalesProducts', () => {
  describe('Ao inserir uma venda no banco de dados', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'query').resolves(mockNewSaleProduct);
    });

    afterEach(async () => {
      connection.query.restore();
    });

    it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
      const result = await SalesProductsModel.createSaleProduct(salesList);
      expect(result).to.include.all.keys('affectedRows', 'insertId');
    });

    it('Espera que a chave "affectedRows" não seja igual a 0', async () => {
      const { affectedRows } = await SalesProductsModel.createSaleProduct(salesList);
      expect(affectedRows).not.to.be.equal(0);
    });
  });

  describe('Ao atualizar uma venda no banco de dados', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'query').resolves(mockNewSaleProduct);
    });

    afterEach(async () => {
      connection.query.restore();
    });

    it('Retorna um array de objetos com os valores atualizados', async () => {
      const result = await SalesProductsModel.updateSaleProduct(1, salesList);
      expect(result[0]).to.include.all.keys('productId', 'quantity');
      expect(result[0].productId).to.be.equal(1);
      expect(result[0].quantity).to.be.equal(1);
      expect(result[1].productId).to.be.equal(2);
      expect(result[1].quantity).to.be.equal(50);
    });

    it('Espera que as chave "productId" e "quantity" não sejam iguais a 0', async () => {
      const { productId, quantity } = await SalesProductsModel.updateSaleProduct(1, salesList);
      expect(productId).not.to.be.equal(0);
      expect(quantity).not.to.be.equal(0);
    });
  });
});