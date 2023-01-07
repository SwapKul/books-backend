import { FLOAT, INTEGER, JSON, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const CartItem = sequelize.define("cartitems", {
  cart_item_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  cart_id: { type: STRING, allowNull: false },

  product_quantity: { type: INTEGER, allowNull: false },

  product_id: { type: STRING, allowNull: false },

}, {
    timestamps : true
});

export default CartItem;
