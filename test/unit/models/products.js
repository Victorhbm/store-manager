const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../models/mysql-connection");
const productModels = require("../../../models/productModels");
const { fakeProducts, fakeProduct } = require('../mocks/productMocks');

describe('Executa a model getAllProducts', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([ fakeProducts ]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      const result = await productModels.getAllProducts();

      expect(result).to.be.equals(fakeProducts)
    });
  });
});

describe('Executa a model getProductById', () => {
  describe('verifica se a funcao', () => {
    describe('retorna os dados corretos ao', () => {
      it('passar um ID existente', async () => {
        sinon.stub(connection, 'execute').resolves([ fakeProduct ]);
        const result = await productModels.getProductById(1);
        
        expect(result.id).to.be.equals(1);
        expect(result.name).to.be.equals('Martelo de Thor');
        expect(result.quantity).to.be.equals(10);
        connection.execute.restore();
      });

      it('passar um ID inexistente', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        const result = await productModels.getProductById(25);
  
        expect(result).to.be.null;
        connection.execute.restore();
      });
    })
  });
});

describe('Executa a model getProductByName', () => {
  describe('verifica se a funcao', () => {
    describe('retorna os dados corretos ao', () => {
      it('passar um name existente', async () => {
        sinon.stub(connection, 'execute').resolves([ fakeProduct ]);
        const result = await productModels.getProductByName('Martelo de Thor');
        
        expect(result.id).to.be.equals(1);
        expect(result.name).to.be.equals('Martelo de Thor');
        expect(result.quantity).to.be.equals(10);

        connection.execute.restore();
      });

      it('passar um name inexistente', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
        const result = await productModels.getProductByName('xablau');
  
        expect(result).to.be.null;
        connection.execute.restore();
      });
    })
  });
});

describe('Executa a model createProduct', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      const result = await productModels.createProduct('Espada', 10);
      
      expect(result.id).to.be.equals(2);
      expect(result.name).to.be.equals('Espada');
      expect(result.quantity).to.be.equals(10);

      connection.execute.restore();
    });
  });
});
