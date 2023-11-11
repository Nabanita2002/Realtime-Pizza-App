const Order = require('../../../models/order');

function statusController() {
  return {
    update(req, res) {
      const { orderId, status } = req.body;

      Order.updateOne({ _id: orderId }, { status })
        .then(() => {
         
          //emit event
          const eventEmitter=req.app.get('eventEmitter')
          eventEmitter.emit('orderUpdated', {id:req.body.orderId, status: req.body.status})
          res.redirect('/admin/orders');
        })
        .catch((err) => {
          console.error('Error updating order:', err);
          res.redirect('/admin/orders');
        });
    }
  };
}

module.exports = statusController;
