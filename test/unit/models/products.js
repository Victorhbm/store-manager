const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../models/mysql-connection");
const productModels = require("../../../models/productModels");

describe('Executa a funcao getAllProducts', () => {
  describe('verifica se a funcao', () => {
    const fakeProducts = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute').resolves(fakeProducts);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna os dados corretos', () => {
      const result = productModels.getAllProducts();

      expect(result).to.be.equals(fakeProducts)
    });
  });
});
