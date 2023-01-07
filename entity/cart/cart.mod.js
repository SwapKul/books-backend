import { FLOAT, INTEGER, JSON, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const Cart = sequelize.define("carts", {
  cart_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  product_quantity: { type: INTEGER, defaultValue: 1, allowNull: false},

  cart_subtotal: { type: FLOAT, defaultValue: 0, allowNull: false},

  is_active: { type: INTEGER, defaultValue: 1},

  created_by: { type: STRING, allowNull: false }

}, {
    timestamps : true
});

export default Cart;
