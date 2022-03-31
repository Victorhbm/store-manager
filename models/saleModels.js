const connection = require('./mysql-connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `
    SELECT
      sp.sale_id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON s.id = sp.sale_id
    `,
  );

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON s.id = sp.sale_id
    WHERE s.id = ?
    `,
    [id],
  );

  if (sale.length === 0) return null;

  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};
