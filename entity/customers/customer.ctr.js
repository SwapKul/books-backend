import Customer from "./customer.mod.js";
import { v4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { toImageString } from "../../common/uploadImage.js";

export const registerCustomer = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_no, password} = req.body;
        console.log("===req body", req.body);
        
        // Validate customer input
        if (!(email && password && first_name && last_name && mobile_no)) {
            res.status(400).json({ status: "error", msg: "Please send all inputs!", data: []});
            return;
        }
        let exist = await Customer.findOne({
            where: {
                [Op.or]: [
                    {email:  email},
                    {mobile_no: mobile_no}
                ]
            }
        });

        console.log(exist)

        if (exist) {
            res.status(200).json({ status: "error", msg: "This email is already registered!", data: exist});
            return;
        };

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newCustomer = Customer.build({
            customer_id: `customer-${v4()}`,
            first_name,
            last_name,
            email,
            mobile_no,
            password: encryptedPassword
        
        });
        await newCustomer.save();
        // const newCustomer = await Customer.create(CustomerData);

    // Create token
        const token = jwt.sign(
            { customer_id: newCustomer.customer_id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
            expiresIn: "2h",
            }
        );
        // save customer token
        console.log("===token", token);
        newCustomer.customer_token = token;
        console.log("===new Customer", newCustomer)
        return res.status(200).json({ status: "success", msg: "New Customer Successfully Created!!", data: newCustomer});
    } catch (err) {
        return res.status(500).json({ status: "error", msg: err.message, data: []})
    }
};

export const loginCustomer = async (req, res) => {
    try {
        // Get customer input
        const { email, password } = req.body;
    
        // Validate customer input
        if (!(email && password)) {
          res.status(400).send({ status: "error", msg: "All inputs are required!", data: []});
        }
        // Validate if customer exist in our database
        const customer = await Customer.findOne({
            where: { 
                email 
            }
        });
    
        if (customer && (await bcrypt.compare(password, customer.password))) {
          // Create token
          const token = jwt.sign(
            { customer_id: customer.customer_id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
    
          // save customer token
          customer.customer_token = token;
          customer.dataValues.image = await toImageString({ ext: customer.customer_image_ext, buffer: customer.customer_image})
          // customer
          res.status(200).json({ status: "success", msg: "Successfully logged in!", data: customer});
        }
        res.status(200).json({ status: "error", msg: "invalid credentials!", data: []});
      } catch (err) {
        console.log({ status: "error", msg: err.message, data: []});
      }
};

export const getCustomers = async (req, res) => {
    try {
        console.log("===req body", req.body)
        let exist = await Customer.findAll();

        return res.status(200).json({status: "success", msg: "Customers data fetched successfully", data: exist});
        
    } catch (err) {
        return res.status(500).json({status: "success", msg: err.message, data: []})
    }
}

export const addCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        console.log("===req body", customerData.mobile_no)
        let exist = await Customer.findOne({
            where: {
                [Op.or]: [
                    {email:  email},
                    {mobile_no: mobile_no}
                ]
            }
        });

        console.log(exist)

        if (exist) {
            res.status(200).json({ status: "error", msg: "This number is already registered!", data: exist});
            return;
        };

        const newCustomer = Customer.build({...customerData, customer_id: `Customer-${v4()}`});
        await newCustomer.save();
        // const newCustomer = await Customer.create(customerData);
        console.log("===new Customer", newCustomer)
        return res.status(200).json({ status: "success", msg: "New Customer Successfully Created!!", data: newCustomer});
    } catch (err) {
        return res.status(500).json({ status: "success", msg: err.message, data: []})
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const customerFile = req.file;
        console.log("===req body", customerData.mobile_no);
        let updateLog;
        if (customerFile) {
            updateLog = await Customer.update({...customerData, customer_image: customerFile.buffer, customer_image_ext: customerFile.mimetype}, {
                where: {
                    customer_id:  customerData.customer_id
                }
            });
            return res.status(200).json({ status: "success", msg: "Customer's Data Successfully Updated!!"});
        }
        updateLog = await Customer.update(customerData, {
            where: {
                customer_id:  customerData.customer_id
            }
        });


        console.log(updateLog)

        // if (exist) {
        //     res.status(200).json({ status: "error", msg: "This number is already registered!", data: exist});
        //     return;
        // };

        // const newCustomer = Customer.build(customerData);
        // await newCustomer.save();
        // // const newCustomer = await Customer.create(customerData);
        // console.log("===new Customer", newCustomer)
        return res.status(200).json({ status: "success", msg: "Customer's Data Successfully Updated!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export const updateCustomerImage = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const customerFile = req.file;
        // console.log("===req body", customerData.mobile_no);
        let updateLog;

        if (!customerFile) {
            res.status(200).json({ status: "error", msg: "Please send the image file", data: []});
            return;
        };
        if (customerFile) {
            updateLog = await Customer.update({customer_id, customer_image: customerFile.buffer, customer_image_ext: customerFile.mimetype}, {
                where: {
                    customer_id:  customer_id
                }
            });
            return res.status(200).json({ status: "success", msg: "Customer's Image Successfully Updated!!"});
        }


        console.log(updateLog)
        // return res.status(200).json({ status: "success", msg: "Customer's Data Successfully Updated!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export const toggleCustomer = async (req, res) => {
    try {
        const updated_by = req.admin.admin_id;
        const { customer_id } = req.body;
        console.log("===req body", req.body);
        console.log("===switching customer activity")
        let exist = await Customer.findOne({
            where: {
                customer_id
            }
        });

        let updateLog = await Customer.update({ is_active: !exist.is_active, updated_by}, {
            where: {
                customer_id
            }
        });

        console.log(updateLog);
        return res.status(200).json({ status: "success", msg: "Customer's Data Successfully Updated!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};