import { BIGINT, BLOB, DATE, FLOAT, INTEGER, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const Product = sequelize.define("products", {
  product_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  product_name: { type: STRING, allowNull: false },

  product_image: { type: BLOB("long"), allowNull: false },

  product_image_ext: { type: STRING, allowNull: false },

  product_price: { type: FLOAT, allowNull: false },

  is_active: { type: INTEGER, defaultValue: 1, allowNull: false },

  is_featured: { type: INTEGER, defaultValue: 0, allowNull: false},

  stock: { type: INTEGER, defaultValue: 1, allowNull: false},

  created_by: { type: STRING, allowNull: false },

  updated_by: { type: STRING, allowNull: false }

}, {
    timestamps : true
});


export default Product;
