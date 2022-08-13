const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const connection = require('../../../models/connection');

const mockNewSale = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 3,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}, undefined];

describe('Testes da Camada de Models - Sales', () => {
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
});