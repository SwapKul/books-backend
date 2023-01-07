import { FLOAT, INTEGER, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const Order = sequelize.define("orders", {
  order_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  order_subtotal: { type: FLOAT, defaultValue: 0, allowNull: false},

  cart_id: { type: STRING, allowNull: false },

  is_active: { type: INTEGER, defaultValue: 1},

  created_by: { type: STRING, allowNull: false }

}, {
    timestamps : true
});

export default Order;
