const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const homeController = require("../app/http/controllers/homeController")

// const menuController=require("../app/http/controllers/customer/menuController")





const orderController = require('../app/http/controllers/customer/orderController')

const AdminOrderController= require('../app/http/controllers/admin/orderController');




// middlewares

const auth= require('../app/http/middlewares/auth');

const admin= require('../app/http/middlewares/admin');

const guest = require('../app/http/middlewares/guest');

const statusController= require('../app/http/controllers/admin/statusController')



function initRoutes(app) {

    app.get('/', homeController().index);

    app.get('/cart', cartController().cart)

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);


    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    // app.get('/menu', menuController().menu)

 

    app.post('/logout', function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });

    app.post('/update-cart', cartController().update)

    //customer routes

    app.post('/orders', auth, orderController().store)

    app.get('/customer/orders', auth ,orderController().index)
    app.get('/customer/orders/:id', auth ,orderController().show)

    // admin routes

    app.get('/admin/orders', admin ,AdminOrderController().index)

    app.post('/admin/order/status', admin, statusController().update)


}

module.exports = initRoutes