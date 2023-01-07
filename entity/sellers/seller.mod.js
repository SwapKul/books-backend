import { BIGINT, INTEGER, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const Seller = sequelize.define("seller", {
  seller_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  first_name: { type: STRING, allowNull: false },

  last_name: { type: STRING, allowNull: false },

  email: { type: STRING, allowNull: false },

  mobile_no: { type: BIGINT, allowNull: false },

  password: {type: STRING, allowNull: false},

  is_active: { type: INTEGER, defaultValue: 1, allowNull: false },

  user_type: { type: STRING, defaultValue: "seller" },
  
  seller_token: { type: STRING, allowNull: true }

}, {
    timestamps : true
});

export default Seller;
