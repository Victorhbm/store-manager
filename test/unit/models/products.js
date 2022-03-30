const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../models/mysql-connection");
const productModels = require("../../../models/productModels");

describe('Executa a funcao getAllProducts', () => {
  describe('verifica se a funcao', () => {
    const fakeProducts = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([fakeProducts]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna os dados corretos', async () => {
      const result = await productModels.getAllProducts();

      expect(result).to.be.equals(fakeProducts)
    });
  });
});

describe('Executa a funcao getProductById', () => {
  describe('verifica se a funcao', () => {
    const fakeProduct = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }]
    
    describe('retorna os dados corretos ao', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([fakeProduct]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('passar um ID existente', async () => {
        const result = await productModels.getProductById(1);
        
        expect(result.id).to.be.equals(1);
        expect(result.name).to.be.equals('Martelo de Thor');
        expect(result.quantity).to.be.equals(10);
      });
    })

    describe('retorna os dados corretos ao', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('passar um ID inexistente', async () => {
        const result = await productModels.getProductById(25);
  
        expect(result).to.be.null;
      });
    })
  });
});
