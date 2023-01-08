import Cart from "../cart/cart.mod.js";
import Customer from "../customers/customer.mod.js";
import Order from "./order.mod.js";

export const getOrders = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const orders = await Order.findAll({
            where: {
                created_by: customer_id
            }
        });

        return res.status(200).json({ status: "success", msg: "Orders successfully fetched", data: orders});
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Error while fetching orders", data: []});
    }
}

export const createOrder = async (req, res) => {
    try {
        const { customer_id } = req.body;

        const exist = await Cart.findOne({
            where: {
                created_by : customer_id
            }
        });

        const custInfo = await Customer.findOne({
            where: {
                customer_id
            }
        })

        const newOrder = Order.build({
            order_id: `order-${v4()}`,
            order_subtotal: exist.cart_subtotal,
            cart_id: exist.cart_id,
            is_active: 1,
            created_by: customer_id
        });
        

        await newOrder.save();

        if (newOrder) {
            await Customer.update({ points: custInfo.points - exist.cart_subtotal},{
                where: {
                    customer_id
                }
            })
        }
        return res.status(200).json({ status: "success", msg: "Order successfully created", data: newOrder});

    } catch (err) {
        return res.status(500).json({ status: "error", msg: err.message, data: []});
    }
}

export const cancelOrder = async (req, res) => {
    try {
        const { customer_id, order_id } = req.body;

        const exist = await Order.findOne({
            where: {
                order_id
            }
        });

        const cancelOrder = await Order.update({
            is_active: 0,
        },{
        where :{
            order_id
        }});

        if (cancelOrder) {
            await Customer.update({ points: custInfo.points + exist.order_subtotal},{
                where: {
                    customer_id
                }
            })
        }
        return res.status(200).json({ status: "success", msg: "Order successfully cancelled", data: cancelOrder});

    } catch (err) {
        return res.status(500).json({ status: "error", msg: err.message, data: []});
    }
}