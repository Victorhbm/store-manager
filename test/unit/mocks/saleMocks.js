const fakeSales = [
  {
      "saleId": 1,
      "date": "2022-04-01T10:51:11.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "saleId": 1,
      "date": "2022-04-01T10:51:11.000Z",
      "productId": 2,
      "quantity": 10
  },
  {
      "saleId": 2,
      "date": "2022-04-01T10:51:11.000Z",
      "productId": 3,
      "quantity": 15
  }
];

const fakeSalesById = [
  {
      "date": "2022-04-01T10:51:11.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "date": "2022-04-01T10:51:11.000Z",
      "productId": 2,
      "quantity": 10
  }
];

const fakeSaleProducts = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 5
  }
];

const fakeSaleReturn = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

module.exports = {
  fakeSales,
  fakeSalesById,
  fakeSaleProducts,
  fakeSaleReturn,
}