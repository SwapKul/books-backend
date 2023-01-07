import Cart from "./cart.mod.js";
import { v4 } from 'uuid';
import Product from "../products/product.mod.js";
import CartItem from "./cartItem.mod.js";

export const getCartDetails = async (req, res) => {
    try {
        Cart.hasMany(CartItem, {
            foreignKey: "cart_id",
            sourceKey: "cart_id"
        });
        // CartItem.belongsTo(Cart, {
        //     foreignKey: "cart_id"
        // })
        CartItem.hasOne(Product, {
            foreignKey: "product_id",
            sourceKey: "product_id"
        })
        const exist = Cart.findOne({
            where: {
                created_by: req.customer_id
            },
            include: [
                {
                    model: CartItem,
                    attributes: ["cart_item_id", "product_id"],
                    include: [
                        {
                            model: Product,
                            attributes: ["product_name", "product_id", "price"]
                        }
                    ]
                }
            ]
        })

        return res.status(200).json({ status: "success", msg: "Cart Data successfully fetched", data: exist })
    } catch (err) {
        return res.status(200).json({ status: "error", msg: "Error occured while fetching cart details", data: [] })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { customer_id, product_id, product_quantity } = req.body;

        const exist = await Cart.findOne({
            where: {
                created_by: customer_id
            }
        })

        const prodInfo = await Product.findOne({
            where: {
                product_id: product_id
            }
        })
        const price = prodInfo.product_price * product_quantity;

        if (!exist) {
            console.log("prodInfo", prodInfo.product_price);
            const newCart = Cart.build({ cart_id: `cart-${v4()}`, product_quantity, cart_subtotal: price, created_by: customer_id, updated_by: customer_id });
            await newCart.save();
            const item = CartItem.build({ cart_item_id: `cart-item-${v4()}`, cart_id: newCart.cart_id, product_id, product_quantity });
            await item.save();
            return res.status(200).json({ status: "success", msg: "cart successfully created", data: { ...newCart.dataValues, "cart-item": item } });
        }

        if (exist) {
            const updateLog = Cart.update({
                product_quantity: exist.product_quantity + product_quantity,
                cart_subtotal: exist.cart_subtotal + price
            },
                {
                    where: {
                        created_by: customer_id
                    }
                }
            )
            const item = CartItem.build({ cart_item_id: `cart-item-${v4()}`, cart_id: exist.cart_id, product_id, product_quantity });
            await item.save();
            return res.status(200).json({ status: "success", msg: "cart successfully updated", data: { ...newCart.dataValues, "cart-item": item } });
        }

        // const updateLog = Cart.update({})

        return res.status(200).json({ status: "success", msg: "cart successfully updated", data: { ...newCart.dataValues, "cart-item": item } });

        // return res.status(200).json({ status: "success", msg: "Successfully sent data", data: []})
    } catch (error) {
        console.log("erroe occured", error);
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { customer_id, product_id, product_quantity } = req.body;

        const prodInfo = await Product.findOne({
            where: {
                product_id: product_id
            }
        })
        const price = prodInfo.product_price * product_quantity;

        const exist = await Cart.findOne({
            where: {
                created_by: customer_id
            }
        })

        const updateLog = await Cart.update({
            cart_subtotal: exist.cart_subtotal - price,
            product_quantity: exist.product_quantity - product_quantity
        },
            {
            where: {
                created_by: customer_id
            }
        })

        const existItem = await CartItem.destroy({
            where: {
                cart_id: exist.cart_id,
                product_id
            }
        })

        if ( updateLog && existItem ) {
            return res.status(200).json({ status: "success", msg: "Item removed successfully", data: []})
        }

        return res.status(200).json({ status: "error", msg: "Some error occured", data: []})

    } catch (err) {
        return res.status(200).json({ status: "error", msg: err.message, data: []})
    }
}