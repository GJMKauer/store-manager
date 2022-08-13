const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/SalesService');
const SalesProductsModel = require('../../../models/SalesProductsModel');

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

const mockNewSaleProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

describe('Testes da Camada de Services - Sales', () => {
  describe('Ao inserir uma venda no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(SalesProductsModel, 'createSaleProduct').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesProductsModel.createSaleProduct.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await SalesService.createSale(salesList);
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows } = await SalesService.createSale(salesList);
        expect(affectedRows).not.to.be.equal(0);
      });
    });
  });
});