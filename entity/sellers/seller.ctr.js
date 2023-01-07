import Seller from "./seller.mod.js";
import { v4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const registerSeller = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_no, password} = req.body;
        console.log("===req body", req.body);
        
        // Validate user input
        if (!(email && password && first_name && last_name && mobile_no)) {
            res.status(400).json({ status: "error", msg: "Please send all inputs!", data: []});
            return;
        }
        let exist = await Seller.findOne({
            where: {
                [Op.or]: [
                    {email:  email},
                    {mobile_no: mobile_no}
                ]
            }
        });

        console.log(exist)

        if (exist) {
            res.status(200).json({ status: "error", msg: "This email or number is already registered!", data: exist});
            return;
        };

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newSeller = Seller.build({
            seller_id: `seller-${v4()}`,
            first_name,
            last_name,
            email,
            mobile_no,
            password: encryptedPassword
        
        });
        await newSeller.save();
        // const newSeller = await Seller.create(sellerData);

    // Create token
        const token = jwt.sign(
            { seller_id: newSeller.seller_id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
            expiresIn: "2h",
            }
        );
        // save user token
        console.log("===token", token);
        newSeller.seller_token = token;
        console.log("===new Seller", newSeller)
        return res.status(200).json({ status: "success", msg: "New Seller Successfully Created!!", data: newSeller});
    } catch (err) {
        return res.status(500).json({ status: "error", msg: err.message, data: []})
    }
};

export const loginSeller = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send({ status: "error", msg: "All inputs are required!", data: []});
        }
        // Validate if user exist in our database
        const seller = await Seller.findOne({
            where: { 
                email 
            }
        });
    
        if (seller && (await bcrypt.compare(password, seller.password))) {
          // Create token
          const token = jwt.sign(
            { seller_id: seller.seller_id, email },
            process.env.ACCESS_TOKEN_SECRET,
            // {
            //   expiresIn: "2h",
            // }
          );
    
          // save user token
          seller.seller_token = token;
    
          // user
          res.status(200).json({ status: "success", msg: "Successfully logged in!", data: seller});
        }
        res.status(200).json({ status: "error", msg: "Invalid Credentials!", data: []});
      } catch (err) {
        console.log({ status: "error", msg: err.message, data: []});
      }
};

export const getSellers = async (req, res) => {
    try {
        console.log("===req body", req.body)
        let exist = await Seller.findAll();

        return res.status(200).json({status: "success", msg: "Sellers data fetched successfully", data: exist});
        
    } catch (err) {
        return res.status(500).json({status: "success", msg: err.message, data: []})
    }
};

export const addSeller = async (req, res) => {
    try {
        const sellerData = req.body;
        console.log("===req body", sellerData.email)
        let exist = await Seller.findOne({
            where: {
                [Op.or]: [
                    {email: sellerData.email},
                    {mobile_no: sellerData.mobile_no}
                ]
            }
        });

        console.log(exist)

        if (exist) {
            res.status(200).json({ status: "error", msg: "This email is already registered!", data: exist});
            return;
        };

        const newSeller = Seller.build({...sellerData, seller_id: `seller-${v4()}`});
        await newSeller.save();
        // const newSeller = await Seller.create(sellerData);
        console.log("===new Seller", newSeller)
        return res.status(200).json({ status: "success", msg: "New Seller Successfully Created!!", data: newSeller});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export const updateSeller = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_no, seller_id} = req.body;
        console.log("===req body", req.body);
        
        // Validate user input
        if (!(email && seller_id && first_name && last_name && mobile_no)) {
            res.status(200).json({ status: "error", msg: "Please send all inputs!", data: []});
            return;
        }
        const sellerData = req.body;
        console.log("===req body", sellerData.mobile_no);
        let updateLog = await Seller.update({ email, first_name, last_name, mobile_no}, {
            where: {
                seller_id:  sellerData.seller_id
            }
        });

        console.log(updateLog)

        // if (exist) {
        //     res.status(200).json({ status: "error", msg: "This number is already registered!", data: exist});
        //     return;
        // };

        // const newSeller = Seller.build(sellerData);
        // await newSeller.save();
        // // const newSeller = await Seller.create(sellerData);
        // console.log("===new Seller", newSeller)
        return res.status(200).json({ status: "success", msg: "Seller's Data Successfully Updated!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export const updateCurrentSeller = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_no, seller_id} = req.body;
        console.log("===req body", req.body);
        
        // Validate user input
        if (!(email && seller_id && first_name && last_name && mobile_no)) {
            res.status(200).json({ status: "error", msg: "Please send all inputs!", data: []});
            return;
        }
        const sellerData = req.body;
        console.log("===req body", sellerData.mobile_no);
        let updateLog = await Seller.update({ email, first_name, last_name, mobile_no}, {
            where: {
                seller_id:  req.seller.seller_id
            }
        });

        if (updateLog) {
            let newData = await Seller.findOne({
                where: {
                    seller_id: req.seller.seller_id
                }
            })

            return res.status(200).json({ status: "success", msg: "Seller's Data Successfully Updated!!", data: newData});
        }

        // if (exist) {
        //     res.status(200).json({ status: "error", msg: "This number is already registered!", data: exist});
        //     return;
        // };

        // const newSeller = Seller.build(sellerData);
        // await newSeller.save();
        // // const newSeller = await Seller.create(sellerData);
        // console.log("===new Seller", newSeller)
        return res.status(200).json({ status: "error", msg: "Error Occurred. Try Again!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export const toggleSeller = async (req, res) => {
    try {
        const updated_by = req.seller.seller_id;
        const { seller_id } = req.body;
        console.log("===req body", req.body);
        let exist = await Seller.findOne({
            where: {
                seller_id 
            }
        });

        let updateLog = await Seller.update({ is_active: !exist.is_active, updated_by}, {
            where: {
                Seller_id 
            }
        });

        console.log(updateLog);
        return res.status(200).json({ status: "success", msg: "User's Data Successfully Updated!!"});
    } catch (err) {
        return res.status(500).json(err.message)
    }
};