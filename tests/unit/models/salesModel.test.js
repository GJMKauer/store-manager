const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const connection = require('../../../models/connection');

const mockAllSales = [[
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-08-14T01:01:36.000Z"
  }
], []];

const mockSaleById = [[
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-08-14T01:01:36.000Z"
  }
], []];

const notFoundByIdSales = [[], []];

const mockNewSale = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 3,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}, undefined];

describe('Testes da Camada de Models - Sales', () => {
  describe('Quando realizar uma busca por todas as vendas', () => {
    describe('Quando as vendas são encontradas', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockAllSales);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array na função getAllSales', async () => {
        const result = await SalesModel.getAllSales();
        expect(result).to.be.an('array');
      });

      it('Retorna todas as vendas corretamente', async () => {
        const result = await SalesModel.getAllSales();
        expect(result).to.be.equal(mockAllSales[0]);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando a venda não é encontrada', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(notFoundByIdSales);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array vazio caso nenhuma venda seja encontrada', async () => {
        const result = await SalesModel.getSaleByPk(9);
        expect(result).to.be.equal(notFoundByIdSales[0]);
      });
    });

    describe('Quando a venda é encontrada', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockSaleById);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array na função getSaleByPk', async () => {
        const result = await SalesModel.getSaleByPk(1);
        expect(result).to.be.an('array');
      });

      it('A venda retornada tem as propriedades "productId", "quantity" e "date"', async () => {
        const result = await SalesModel.getSaleByPk(1);
        expect(result[0]).to.include.all.keys('productId', 'quantity', 'date');
      });

      it('A venda retornada é a correta', async () => {
        const result = await SalesModel.getSaleByPk(1);
        expect(result[0]).to.be.equal(mockSaleById[0][0]);
      });
    });
  });

  describe('Ao inserir uma venda no banco de dados', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'query').resolves(mockNewSale);
    });

    afterEach(async () => {
      connection.query.restore();
    });

    it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
      const result = await SalesModel.createSale();
      expect(result).to.include.all.keys('affectedRows', 'insertId');
    });

    it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
      const { affectedRows, insertId } = await SalesModel.createSale();
      expect(affectedRows).not.to.be.equal(0);
      expect(insertId).not.to.be.equal(0);
    });
  });

  describe('Ao deletar uma venda no banco de dados', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'query').resolves(mockNewSale);
    });

    afterEach(async () => {
      connection.query.restore();
    });

    it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
      const result = await SalesModel.deleteSale();
      expect(result).to.include.all.keys('affectedRows', 'insertId');
    });

    it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
      const { affectedRows, insertId } = await SalesModel.deleteSale();
      expect(affectedRows).not.to.be.equal(0);
      expect(insertId).not.to.be.equal(0);
    });
  });
});