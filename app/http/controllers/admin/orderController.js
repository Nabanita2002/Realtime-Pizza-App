

// const order = require('../../../models/order')
const Order = require('../../../models/order')

function orderController() {
    return {

        index(req, res) {

            Order.find({ status: { $ne: 'completed' } })
                .sort({ 'createdAt': -1 })
                .populate('userId', '-password')
                .then((orders) => {
                    if (req.xhr) {
                        return res.json(orders);
                    }
                    return res.render('admin/orders', { orders });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                });


        }
    }
}

module.exports = orderController