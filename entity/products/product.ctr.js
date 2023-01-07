import Product from "./product.mod.js";
import { v4 } from "uuid";
import { toImageString } from "../../common/uploadImage.js";

export const getProducts = async (req, res) => {
  try {
    // exist.product_category_bar_image = toImageString()
    console.log("===req body", req.body);
    let exist = await Product.findAll();

    exist.forEach((row) => {
      return (row.dataValues.image = toImageString({
        ext: row.product_image_ext,
        buffer: row.product_image,
      }));
    });

    return res
      .status(200)
      .json({
        status: "success",
        msg: "Products data fetched successfully",
        data: exist,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "success", msg: err.message, data: [] });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {

    // exist.product_category_bar_image = toImageString()
    console.log("===req body", req.body);
    let exist = await Product.findAll({
      where: {
        is_featured: 1
      }
    });

    exist.forEach((row) => {
      return (row.dataValues.image = toImageString({
        ext: row.product_image_ext,
        buffer: row.product_image,
      }));
    });

    return res
      .status(200)
      .json({
        status: "success",
        msg: "Products data fetched successfully",
        data: exist,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "success", msg: err.message, data: [] });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const created_by = req.admin.admin_id;
    const productFile = req.file;
    console.log("===productFile", productFile);

    if (!productFile) {
      res
        .status(200)
        .json({ status: "error", msg: "Please send the image file", data: [] });
      return;
    }
    console.log("===req body", productData.product_name);
    let exist = await Product.findOne({
      where: {
        product_name: productData.product_name,
      },
    });

    console.log(exist);

    if (exist) {
      res
        .status(200)
        .json({
          status: "error",
          msg: "This product is already registered!",
          data: exist,
        });
      return;
    }

    const newProduct = Product.build({
      ...productData,
      product_image: productFile?.buffer,
      product_image_ext: productFile?.mimetype,
      product_id: `product-${v4()}`,
      created_by,
      updated_by: created_by,
    });
    await newProduct.save();
    // const newProduct = await Product.create(productData);
    console.log("===new Product", newProduct);
    return res
      .status(200)
      .json({
        status: "success",
        msg: "New Product Successfully Created!!",
        data: newProduct,
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productData = req.body;
    const updated_by = req.admin.admin_id;
    const productFile = req.file;
    console.log("===req body", productData.product_name);
    let updateLog = await Product.update(
      {
        ...productData,
        product_image: productFile.buffer,
        product_image_ext: productFile.mimetype,
        updated_by,
      },
      {
        where: {
          product_id: productData.product_id,
        },
      }
    );

    console.log(updateLog);

    // if (exist) {
    //     res.status(200).json({ status: "error", msg: "This number is already registered!", data: exist});
    //     return;
    // };

    // const newProduct = Product.build(productData);
    // await newProduct.save();
    // // const newProduct = await Product.create(productData);
    // console.log("===new Product", newProduct)
    return res
      .status(200)
      .json({
        status: "success",
        msg: "Product's Data Successfully Updated!!",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const toggleProductFeature = async (req, res) => {
  try {
    const updated_by = req.admin.admin_id;
    const { product_id } = req.body;
    console.log("===req body", req.body);
    let exist = await Product.findOne({
      where: {
        product_id,
      },
    });

    let updateLog = await Product.update(
      { is_featured: !exist.is_featured, updated_by },
      {
        where: {
          product_id,
        },
      }
    );

    console.log(updateLog);
    return res
      .status(200)
      .json({
        status: "success",
        msg: "Product's Data Successfully Updated!!",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const toggleProduct = async (req, res) => {
  try {
    const updated_by = req.admin.admin_id;
    const { product_id } = req.body;
    console.log("===req body", req.body);
    let exist = await Product.findOne({
      where: {
        product_id,
      },
    });

    let updateLog = await Product.update(
      { is_active: !exist.is_active, updated_by },
      {
        where: {
          product_id,
        },
      }
    );

    console.log(updateLog);
    return res
      .status(200)
      .json({
        status: "success",
        msg: "Product's Data Successfully Updated!!",
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
