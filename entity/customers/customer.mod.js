import { BIGINT, BLOB, DATE, INTEGER, STRING } from "sequelize";

import sequelize from "../../config/db.config.js";

const Customer = sequelize.define("customers", {
  customer_id: {
    type: STRING,

    primaryKey: true,

    allowNull: false
  },

  first_name: { type: STRING, allowNull: false },

  last_name: { type: STRING, allowNull: false },

  email: { type: STRING, allowNull: false },

  mobile_no: { type: BIGINT, allowNull: false },

  points: { type: INTEGER, defaultValue: 100},

  password: {type: STRING, allowNull: false},

  customer_image: { type: BLOB("long"), allowNull: true },

  customer_image_ext: { type: STRING, allowNull: true },

  is_active: { type: INTEGER, defaultValue: 1, allowNull: false },

  customer_type: { type: STRING, defaultValue: "customer" },
  
  customer_token: { type: STRING, allowNull: true }

}, {
    timestamps : true
});

export default Customer;
